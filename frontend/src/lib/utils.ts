import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createTransactionId(id: number) {
  return `TRX-${id.toString().padStart(4, '0')}`;
}
