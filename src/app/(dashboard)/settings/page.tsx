import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';

export default function SettingsPage() {
  async function handleSave(formData: FormData) {
    'use server';
    const businessName = formData.get('businessName') as string;
    const notificationEmail = formData.get('notificationEmail') as string;
    
    // In a real app, this would save to Supabase
    // For now, we'll just simulate a save
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // You could add a toast notification here
    return { success: true };
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>
      <p className={styles.subtitle}>
        Manage your business settings and preferences.
      </p>
      
      <Card>
        <h2 className={styles.sectionTitle}>Business Information</h2>
        <form action={handleSave} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="businessName" className={styles.label}>
              Business Name
            </label>
            <Input
              id="businessName"
              name="businessName"
              type="text"
              placeholder="Your Business Name"
              defaultValue="Flowdesk"
            />
          </div>
          
          <div className={styles.field}>
            <label htmlFor="notificationEmail" className={styles.label}>
              Notification Email
            </label>
            <Input
              id="notificationEmail"
              name="notificationEmail"
              type="email"
              placeholder="notifications@example.com"
              defaultValue=""
            />
            <p className={styles.helpText}>
              Email address to receive booking notifications
            </p>
          </div>
          
          <Button type="submit" className={styles.saveButton}>
            Save Changes
          </Button>
        </form>
      </Card>
    </div>
  );
}
