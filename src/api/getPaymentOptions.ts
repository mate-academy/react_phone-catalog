import { PaymentOption } from '../modules/shared/Types/types';
import { getData } from '../utils/fetchClient';

export function getPaymentOptions(): Promise<PaymentOption[]> {
  return getData<PaymentOption[]>('paymentOptions.json');
}
