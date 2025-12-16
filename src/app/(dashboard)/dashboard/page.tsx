import { Suspense } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getBookingStats, getRecentBookings } from '@/lib/bookings/queries';
import styles from './page.module.css';

async function StatsCards() {
  const stats = await getBookingStats();

  return (
    <div className={styles.statsGrid}>
      <Card>
        <div className={styles.statCard}>
          <h3 className={styles.statLabel}>Pending</h3>
          <p className={styles.statValue}>{stats.pending}</p>
        </div>
      </Card>
      <Card>
        <div className={styles.statCard}>
          <h3 className={styles.statLabel}>Approved</h3>
          <p className={styles.statValue}>{stats.approved}</p>
        </div>
      </Card>
      <Card>
        <div className={styles.statCard}>
          <h3 className={styles.statLabel}>Rejected</h3>
          <p className={styles.statValue}>{stats.rejected}</p>
        </div>
      </Card>
      <Card>
        <div className={styles.statCard}>
          <h3 className={styles.statLabel}>Total</h3>
          <p className={styles.statValue}>{stats.total}</p>
        </div>
      </Card>
    </div>
  );
}

async function RecentBookings() {
  const bookings = await getRecentBookings(5);

  if (bookings.length === 0) {
    return (
      <Card>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Bookings</h2>
        </div>
        <div className={styles.emptyState}>
          <p>No bookings yet.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Recent Bookings</h2>
        <Link href="/dashboard/bookings">
          <Button variant="secondary">View All</Button>
        </Link>
      </div>
      <div className={styles.bookingsList}>
        {bookings.map((booking) => (
          <div key={booking.id} className={styles.bookingItem}>
            <div className={styles.bookingInfo}>
              <p className={styles.bookingName}>{booking.name}</p>
              <p className={styles.bookingDetails}>
                {new Date(booking.date).toLocaleDateString()} at {booking.time}
              </p>
            </div>
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
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <Suspense fallback={<Skeleton height={120} />}>
        <StatsCards />
      </Suspense>
      <Suspense fallback={<Skeleton height={300} />}>
        <RecentBookings />
      </Suspense>
    </div>
  );
}
