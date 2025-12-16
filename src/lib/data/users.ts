import { createClient } from '@/lib/supabase/server';

export async function getUsers() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('profiles').select('*').limit(100);

    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

