import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Vaulta</h1>
        <p className={styles.subtitle}>
          Internal ops dashboard for KPIs, users, and activity logs.
        </p>
        <div className={styles.actions}>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="secondary">View Demo</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
