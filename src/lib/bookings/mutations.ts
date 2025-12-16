'use server';

import { createClient } from '@/lib/supabase/server';
import { BookingStatus } from './queries';
import { revalidatePath } from 'next/cache';

export async function createBooking(data: {
  name: string;
  email: string;
  date: string;
  time: string;
  notes?: string;
}) {
  const supabase = await createClient();
  const { data: booking, error } = await supabase
    .from('bookings')
    .insert({
      name: data.name,
      email: data.email,
      date: data.date,
      time: data.time,
      notes: data.notes || null,
      status: 'pending',
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard/bookings');
  revalidatePath('/dashboard');
  return { data: booking };
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard/bookings');
  revalidatePath('/dashboard');
  return { data };
}
