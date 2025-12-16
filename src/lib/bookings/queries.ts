'use server';

import { createClient } from '@/lib/supabase/server';

export type BookingStatus = 'pending' | 'approved' | 'rejected';

export interface Booking {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  notes: string | null;
  status: BookingStatus;
  created_at: string;
}

export async function getBookings() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch bookings: ${error.message}`);
  }

  return data as Booking[];
}

export async function getBookingsByStatus(status: BookingStatus) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch bookings: ${error.message}`);
  }

  return data as Booking[];
}

export async function getBookingStats() {
  const [pending, approved, rejected] = await Promise.all([
    getBookingsByStatus('pending'),
    getBookingsByStatus('approved'),
    getBookingsByStatus('rejected'),
  ]);

  return {
    pending: pending.length,
    approved: approved.length,
    rejected: rejected.length,
    total: pending.length + approved.length + rejected.length,
  };
}

export async function getRecentBookings(limit: number = 5) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch recent bookings: ${error.message}`);
  }

  return data as Booking[];
}
