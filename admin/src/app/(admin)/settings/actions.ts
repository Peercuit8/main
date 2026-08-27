'use server';

import { revalidatePath } from 'next/cache';
import { setSetting } from '@/lib/settings';

export async function saveEmailTemplate(formData: FormData) {
  const subject = formData.get('subject') as string;
  const body = formData.get('body') as string;

  if (!subject || !body) {
    return { error: 'Subject and body are required.' };
  }

  try {
    await setSetting('coffee_chat_email_template', { subject, body });
    revalidatePath('/settings');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function toggleApplicationsStatus(isOpen: boolean) {
  try {
    await setSetting('applications_open', isOpen);
    revalidatePath('/settings');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
