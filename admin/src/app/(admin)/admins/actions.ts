'use server'

import { revalidatePath } from 'next/cache'
import { supabaseAdmin } from '@/lib/supabase'
import { createClient } from '@/lib/supabase/server'
import { logAdminAction } from '@/lib/audit'

export async function createAdminUser(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  // Create user using the admin API
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (error) {
    return { error: error.message }
  }

  const supabaseServer = await createClient()
  const { data: { user } } = await supabaseServer.auth.getUser()
  if (user) {
    await logAdminAction(user.email!, 'Created Admin User', { target_email: email })
  }

  revalidatePath('/admins')
  return { success: true }
}

export async function deleteAdminUser(userId: string) {
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)
  
  if (error) {
    return { error: error.message }
  }

  const supabaseServer = await createClient()
  const { data: { user } } = await supabaseServer.auth.getUser()
  if (user) {
    await logAdminAction(user.email!, 'Deleted Admin User', { target_id: userId })
  }

  revalidatePath('/admins')
  return { success: true }
}
