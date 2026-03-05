import { useState } from 'react';
import { getLiqPayPayload } from '@/services/paymentAPI';
import type { LiqPayPayload } from '../types/checkout';

const DEFAULT_PAYMENT_ERROR =
  'Failed to initialize LiqPay payment. Please try again.';

interface UseLiqPayPaymentParams {
  orderId: string;
  amount: number;
  onError: (message: string) => void;
}

export const useLiqPayPayment = ({
  orderId,
  amount,
  onError,
}: UseLiqPayPaymentParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState<LiqPayPayload | null>(null);

  const handleInitiatePayment = async () => {
    setIsLoading(true);
    try {
      const result = await getLiqPayPayload(orderId, amount);
      setPayload(result);
    } catch (error) {
      const message =
        error instanceof Error && error.message ?
          error.message
        : DEFAULT_PAYMENT_ERROR;
      onError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, payload, handleInitiatePayment };
};
