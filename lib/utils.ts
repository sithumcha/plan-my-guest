import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | Date) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function generateSlug(groom: string, bride: string): string {
  const cleanGroom = groom.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanBride = bride.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${cleanGroom}-${cleanBride}`;
}
