'use client';

import { Button } from '@/components/ui/Button';

export function SeedButton() {
  function handleClick() {
    alert('Demo seeding feature coming soon!');
  }

  return <Button onClick={handleClick}>Seed demo users</Button>;
}

