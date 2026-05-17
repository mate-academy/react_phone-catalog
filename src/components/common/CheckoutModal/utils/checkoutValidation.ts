import type { DeliveryMethod, PaymentMethod } from '../CheckoutModal.types';

interface Step1ValidationParams {
  fullName: string;
  phone: string;
}

export function validateStep1({
  fullName,
  phone,
}: Step1ValidationParams): boolean {
  return fullName.trim().length >= 2 && phone.trim().length >= 6;
}

interface Step2ValidationParams {
  deliveryMethod: DeliveryMethod;
  address: string;
  hasSelectedCity: boolean;
  hasSelectedWarehouse: boolean;
}

export function validateStep2({
  deliveryMethod,
  address,
  hasSelectedCity,
  hasSelectedWarehouse,
}: Step2ValidationParams): boolean {
  if (deliveryMethod === 'home') {
    return address.trim().length >= 6;
  }

  if (deliveryMethod === 'novapost') {
    return hasSelectedCity && hasSelectedWarehouse;
  }

  return false;
}

export function validateStep3(paymentMethod: PaymentMethod): boolean {
  return Boolean(paymentMethod);
}

export function getStep2ValidationError(
  deliveryMethod: DeliveryMethod,
): string {
  return deliveryMethod === 'home' ? 'Please enter your delivery address.' : '';
}
