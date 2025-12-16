import { signIn } from '@/lib/auth/actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import styles from './page.module.css';

export default function LoginPage() {
  async function handleSubmit(formData: FormData) {
    'use server';
    
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return;
    }

    await signIn(email, password);
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1 className={styles.title}>Flowdesk</h1>
        <p className={styles.subtitle}>Admin Login</p>
        <form action={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="admin@example.com"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className={styles.button}>
            Sign in
          </Button>
        </form>
        <p className={styles.footer}>
          <a href="/" className={styles.link}>
            ← Back to home
          </a>
        </p>
      </Card>
    </div>
  );
}

