import { cn } from '@/lib/utils/cn';
import styles from './Button.module.css';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(styles.button, styles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

