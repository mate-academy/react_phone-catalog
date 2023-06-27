import { PrimaryButton } from '../../UI/PrimaryButton/PrimaryButton';
import './CartSummary.scss';

type CartSummaryProps = {
  count: number;
  sumPrice: number;
};

export const CartSummary = ({ count, sumPrice }: CartSummaryProps) => {
  return (
    <div className="cart-summary">
      <h2 className="cart-summary__title">{`$${sumPrice}`}</h2>
      <p className="cart-summary__total">{`Total for ${count} items`}</p>

      <PrimaryButton
        onClick={() =>
          alert('We are sorry, but this feature is not implemented yet')}
        width={320}
        height={48}
      >
        Checkout
      </PrimaryButton>
    </div>
  );
};
