import { z } from 'zod';

export const SignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  groomName: z.string().min(2, 'Groom name required'),
  brideName: z.string().min(2, 'Bride name required'),
  weddingDate: z.string().min(1, 'Wedding date required'),
  venue: z.string().min(2, 'Venue required'),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const GuestSchema = z.object({
  name: z.string().min(2, 'Guest name is required'),
  phone: z.string().min(6, 'Valid phone number is required'),
  email: z.string().optional(),
  rsvpStatus: z.enum(['pending', 'attending', 'declined']).default('pending'),
  dietaryRestrictions: z.string().optional(),
  plusOnes: z.number().min(0).default(0),
  tableId: z.string().optional(),
});

export const RsvpSubmitSchema = z.object({
  guestId: z.string().optional(),
  weddingSlug: z.string(),
  name: z.string().min(2),
  phone: z.string().min(6),
  rsvpStatus: z.enum(['attending', 'declined']),
  plusOnes: z.number().min(0).default(0),
  dietaryRestrictions: z.string().optional(),
  rsvpNote: z.string().optional(),
});

export const SeatingTableSchema = z.object({
  tableName: z.string().min(1, 'Table name required'),
  capacity: z.number().min(1, 'Capacity must be at least 1').default(8),
});
