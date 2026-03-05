import { z } from 'zod';

export const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(7, 'Phone too short')
    .regex(/^[+\d\s\-()]+$/, 'Invalid phone number'),
  address: z.string().min(5, 'Please enter full address'),
  city: z.string().min(2, 'City is required'),
  zip: z.string().min(3, 'ZIP code is required'),
  country: z.string().min(2, 'Country is required'),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
