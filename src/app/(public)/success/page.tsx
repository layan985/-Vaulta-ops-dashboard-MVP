import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import styles from './page.module.css';

export default function SuccessPage() {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.title}>Booking Request Submitted</h1>
        <p className={styles.message}>
          Thank you for your booking request. We've received your information and will review it shortly.
          You'll receive an email confirmation once your booking has been approved.
        </p>
        <div className={styles.actions}>
          <Link href="/book">
            <Button variant="secondary">Book Another</Button>
          </Link>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
