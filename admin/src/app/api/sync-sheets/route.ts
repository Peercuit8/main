import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST() {
  try {
    // 1. Authenticate Request
    const supabaseServer = await createClient();
    const { data: { user } } = await supabaseServer.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!clientEmail || !privateKey || !sheetId) {
      return NextResponse.json({ error: 'Google Sheets credentials are not configured.' }, { status: 500 });
    }

    // 2. Fetch all responses from DB
    const { data: responses, error: dbError } = await supabaseAdmin
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (dbError) throw dbError;

    // 3. Prepare data for Google Sheets
    const headers = ['ID', 'Name', 'Email', 'School', 'Grade', 'Location', 'Status', 'Matched', 'Current Work', 'Why Join', 'Referral', 'Portfolio Link', 'Interests', 'Created At', 'IP Address'];
    const rows = (responses || []).map(r => [
      r.id,
      r.full_name || '',
      r.email,
      r.school || '',
      r.grade || '',
      r.location || '',
      r.status,
      r.matched ? 'Yes' : 'No',
      r.current_work || '',
      r.why_join || '',
      r.referral || '',
      r.portfolio_link || '',
      r.interests?.join(', ') || '',
      new Date(r.created_at).toLocaleString(),
      r.ip_address || ''
    ]);
    const sheetData = [headers, ...rows];

    // 4. Auth with Google
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 5. Update Sheet
    // Overwrite the 'applications' sheet or default sheet starting at A1
    // For simplicity, we just write to Sheet1 if it exists, or the default first sheet.
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: sheetData
      }
    }).catch(async () => {
      // If Sheet1 doesn't exist, try just A1 which writes to the first sheet
      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: 'A1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: sheetData
        }
      });
    });

    // We can also clear the rest of the sheet if the new data is smaller than the old data, 
    // but a simple update is often enough for a basic integration.
    await sheets.spreadsheets.values.clear({
      spreadsheetId: sheetId,
      range: `A${sheetData.length + 1}:Z`,
    }).catch(() => {}); // ignore clear errors

    return NextResponse.json({ success: true, count: rows.length });
  } catch (error: any) {
    console.error('Google Sheets sync error:', error);
    return NextResponse.json({ error: error.message || 'Failed to sync with Google Sheets' }, { status: 500 });
  }
}
