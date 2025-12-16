import { createBooking } from '@/lib/bookings/mutations';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import styles from './page.module.css';
import { redirect } from 'next/navigation';

export default function BookPage() {
  async function handleSubmit(formData: FormData) {
    'use server';
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const notes = formData.get('notes') as string;

    if (!name || !email || !date || !time) {
      return;
    }

    const result = await createBooking({
      name,
      email,
      date,
      time,
      notes: notes || undefined,
    });

    if (!result.error) {
      redirect('/success');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Card className={styles.card}>
          <h1 className={styles.title}>Book an Appointment</h1>
          <p className={styles.subtitle}>
            Fill out the form below to request an appointment. We'll review your request and get back to you soon.
          </p>
          
          <form action={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Name *
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Email *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="john@example.com"
              />
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="date" className={styles.label}>
                  Date *
                </label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="time" className={styles.label}>
                  Time *
                </label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="notes" className={styles.label}>
                Notes (optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                className={styles.textarea}
                placeholder="Any additional information..."
                rows={4}
              />
            </div>

            <Button type="submit" className={styles.submit}>
              Submit Booking Request
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
