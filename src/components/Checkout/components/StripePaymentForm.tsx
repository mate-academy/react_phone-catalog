import { PaymentElement } from '@stripe/react-stripe-js';
import { Loader2 } from 'lucide-react';
import { useStripePayment } from '../hooks/useStripePayment';
import { TYPOGRAPHY } from '@/constants/typography';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface StripePaymentFormProps {
  onSuccess: () => void;
  onError: (message: string) => void;
}

export const StripePaymentForm = ({
  onSuccess,
  onError,
}: StripePaymentFormProps) => {
  const { isStripeReady, isLoading, handleSubmitPayment } = useStripePayment({
    onSuccess,
    onError,
  });

  const { t } = useTranslation();

  return (
    <form
      onSubmit={handleSubmitPayment}
      className="flex flex-col gap-6"
    >
      <PaymentElement options={{ layout: 'tabs' }} />
      <Button
        type="submit"
        disabled={!isStripeReady || isLoading}
        className={`h-14 ${TYPOGRAPHY.uppercase}`}
      >
        {isLoading ?
          <Loader2 className="w-5 h-5 animate-spin" />
        : t('login.payNow')}
      </Button>
    </form>
  );
};
