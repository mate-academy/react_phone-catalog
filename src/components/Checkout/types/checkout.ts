import type { JSX } from 'react';
import type { PaymentMethod } from '@/types/Order';

export interface LiqPayPayload {
  data: string;
  signature: string;
}

export interface PaymentMethodOption {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: JSX.Element;
}
