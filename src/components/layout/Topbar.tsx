'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './Topbar.module.css';

export function Topbar() {
  const [email, setEmail] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || '');
      }
    }
    getUser();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <header className={styles.topbar}>
      <div className={styles.userMenu}>
        <span className={styles.email}>{email}</span>
        <Button variant="ghost" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
    </header>
  );
}

