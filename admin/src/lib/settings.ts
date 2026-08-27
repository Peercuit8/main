import { supabaseAdmin } from './supabase';

export async function getSetting<T>(key: string, defaultValue: T): Promise<T> {
  const { data, error } = await supabaseAdmin
    .from('settings')
    .select('value')
    .eq('key', key)
    .single();

  if (error || !data) {
    return defaultValue;
  }

  return data.value as T;
}

export async function setSetting<T>(key: string, value: T) {
  const { error } = await supabaseAdmin
    .from('settings')
    .upsert({ key, value, updated_at: new Date().toISOString() });
    
  if (error) {
    console.error(`Error saving setting ${key}:`, error);
    throw error;
  }
}
