import { useState } from 'react';

import { PrimaryButton } from '@components/UI';
import './CartSummary.scss';

type CartSummaryProps = {
  count: number;
  sumPrice: number;
};

export const CartSummary = ({ count, sumPrice }: CartSummaryProps) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="cart-summary">
      <h2 className="cart-summary__title">{`$${sumPrice}`}</h2>

      <p className="cart-summary__total">{`Total for ${count} items`}</p>

      <PrimaryButton
        // eslint-disable-next-line max-len
        onClick={() => setError('We are sorry, but this feature is not implemented yet')}
        width={320}
        height={48}
      >
        Checkout
      </PrimaryButton>

      <p className="cart-summary__error">{error}</p>
    </div>
  );
};
