import { AvailabilityCalendar } from '@/components/calendar/AvailabilityCalendar';
import styles from './page.module.css';

export default function AvailabilityPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Availability</h1>
      <p className={styles.subtitle}>
        Manage your weekly availability by toggling time slots on or off.
      </p>
      <AvailabilityCalendar />
    </div>
  );
}
