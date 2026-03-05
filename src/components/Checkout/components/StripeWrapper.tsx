import { loadStripe, type Stripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import {
  STRIPE_PUBLIC_KEY,
  getStripeAppearance,
} from '../constants/stripeConfig';
import { StripePaymentForm } from './StripePaymentForm';

let stripePromise: Promise<Stripe | null> | null = null;

function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
}

interface StripeWrapperProps {
  clientSecret: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export const StripeWrapper = ({
  clientSecret,
  onSuccess,
  onError,
}: StripeWrapperProps) => {
  if (!clientSecret) return null;

  const appearance = getStripeAppearance();

  return (
    <Elements
      stripe={getStripe()}
      options={{ clientSecret, appearance }}
    >
      <StripePaymentForm
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
};
