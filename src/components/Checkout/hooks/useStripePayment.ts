import type { FormEvent } from 'react';
import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import {
  MOCK_PAYMENT_DELAY_MS,
  ORDER_SUCCESS_RETURN_PATH,
} from '../constants/stripeConfig';

const DEFAULT_PAYMENT_ERROR = 'Payment failed';

interface UseStripePaymentParams {
  onSuccess: () => void;
  onError: (message: string) => void;
}

export const useStripePayment = ({
  onSuccess,
  onError,
}: UseStripePaymentParams) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitPayment = async (event: FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const isMockEnvironment = window.location.hostname === 'localhost';

    if (isMockEnvironment) {
      await new Promise((resolve) =>
        setTimeout(resolve, MOCK_PAYMENT_DELAY_MS),
      );
      setIsLoading(false);
      onSuccess();
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}${ORDER_SUCCESS_RETURN_PATH}`,
      },
      redirect: 'if_required',
    });

    if (error) {
      onError(error.message ?? DEFAULT_PAYMENT_ERROR);
    } else {
      onSuccess();
    }

    setIsLoading(false);
  };

  return { isStripeReady: !!stripe, isLoading, handleSubmitPayment };
};
