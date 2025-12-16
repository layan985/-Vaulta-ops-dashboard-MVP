import { cn } from '@/lib/utils/cn';
import styles from './Input.module.css';
import { InputHTMLAttributes } from 'react';

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(styles.input, className)} {...props} />;
}

