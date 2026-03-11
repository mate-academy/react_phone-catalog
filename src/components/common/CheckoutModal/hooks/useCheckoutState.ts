import { useCallback, useState } from 'react';

import type { PaymentMethod, Step } from '../CheckoutModal.types';

const PHONE_PREFIX = '+380';

export function useCheckoutState() {
  const [step, setStep] = useState<Step>(1);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState(PHONE_PREFIX);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [loading, setLoading] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);
  const [paypalConfirmed, setPaypalConfirmed] = useState(false);

  const resetCheckoutState = useCallback(() => {
    setStep(1);
    setFullName('');
    setPhone('');
    setPaymentMethod('card');
    setLoading(false);
    setSuccessOrderId(null);
    setPaypalConfirmed(false);
    setPaymentOpen(false);
  }, []);

  return {
    step,
    setStep,
    paymentOpen,
    setPaymentOpen,
    fullName,
    setFullName,
    phone,
    setPhone,
    paymentMethod,
    setPaymentMethod,
    loading,
    setLoading,
    successOrderId,
    setSuccessOrderId,
    paypalConfirmed,
    setPaypalConfirmed,
    resetCheckoutState,
  };
}
