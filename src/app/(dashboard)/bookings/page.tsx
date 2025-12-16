import { BookingsTable } from '@/components/tables/BookingsTable';
import styles from './page.module.css';

export default function BookingsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bookings</h1>
      <p className={styles.subtitle}>
        Manage and approve booking requests from clients.
      </p>
      <BookingsTable />
    </div>
  );
}
