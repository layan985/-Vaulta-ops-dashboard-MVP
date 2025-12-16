import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Flowdesk</h1>
        <p className={styles.subtitle}>
          Professional booking & approval platform. Schedule appointments and manage approvals seamlessly.
        </p>
        <div className={styles.actions}>
          <Link href="/book">
            <Button>Book Appointment</Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary">Admin Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
