import { createClient } from '@/lib/supabase/server';

export async function getKpis() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('kpis_daily')
      .select('*')
      .order('date', { ascending: false })
      .limit(30);

    if (error) {
      console.error('Error fetching KPIs:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching KPIs:', error);
    return [];
  }
}

export function getMockKpis() {
  return [
    { date: '2024-01-01', new_users: 120, active_users: 850, revenue: 12500, tickets: 45 },
    { date: '2024-01-02', new_users: 135, active_users: 920, revenue: 14200, tickets: 52 },
    { date: '2024-01-03', new_users: 98, active_users: 880, revenue: 11800, tickets: 38 },
    { date: '2024-01-04', new_users: 156, active_users: 1050, revenue: 16800, tickets: 61 },
    { date: '2024-01-05', new_users: 142, active_users: 980, revenue: 15200, tickets: 48 },
  ];
}

