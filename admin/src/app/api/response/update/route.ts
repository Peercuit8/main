import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { createClient } from '@/lib/supabase/server';
import { logAdminAction } from '@/lib/audit';

export async function POST(req: Request) {
  try {
    const supabaseServer = await createClient();
    const { data: { user } } = await supabaseServer.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, rating, reviewer_notes, cohort } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing application ID' }, { status: 400 });
    }

    const updatePayload: Record<string, any> = {};
    if (rating !== undefined) updatePayload.rating = rating;
    if (reviewer_notes !== undefined) updatePayload.reviewer_notes = reviewer_notes;
    if (cohort !== undefined) updatePayload.cohort = cohort;

    const { error: dbError } = await supabaseAdmin
      .from('applications')
      .update(updatePayload)
      .eq('id', id);

    if (dbError) throw dbError;

    await logAdminAction(user.email!, `Updated details for application`, { id, updates: updatePayload });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
