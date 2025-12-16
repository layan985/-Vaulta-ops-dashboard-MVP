import { Suspense } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { Card } from '@/components/ui/Card';
import { getBookings } from '@/lib/bookings/queries';
import { updateBookingStatus } from '@/lib/bookings/mutations';
import styles from './BookingsTable.module.css';

async function BookingsTableContent() {
  const bookings = await getBookings();

  async function handleApprove(id: string) {
    'use server';
    await updateBookingStatus(id, 'approved');
  }

  async function handleReject(id: string) {
    'use server';
    await updateBookingStatus(id, 'rejected');
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <div className={styles.emptyState}>
          <p>No bookings found.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Email</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className={styles.nameCell}>{booking.name}</td>
                <td className={styles.emailCell}>{booking.email}</td>
                <td className={styles.dateCell}>
                  {new Date(booking.date).toLocaleDateString()} at {booking.time}
                </td>
                <td>
                  <Badge
                    variant={
                      booking.status === 'approved'
                        ? 'success'
                        : booking.status === 'rejected'
                        ? 'danger'
                        : 'warning'
                    }
                  >
                    {booking.status}
                  </Badge>
                </td>
                <td className={styles.actionsCell}>
                  {booking.status === 'pending' && (
                    <div className={styles.actions}>
                      <form action={handleApprove.bind(null, booking.id)}>
                        <Button type="submit" variant="secondary" className={styles.actionButton}>
                          Approve
                        </Button>
                      </form>
                      <form action={handleReject.bind(null, booking.id)}>
                        <Button type="submit" variant="ghost" className={styles.actionButton}>
                          Reject
                        </Button>
                      </form>
                    </div>
                  )}
                  {booking.status !== 'pending' && (
                    <span className={styles.noActions}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function BookingsTable() {
  return (
    <Suspense fallback={<Skeleton height={400} />}>
      <BookingsTableContent />
    </Suspense>
  );
}
