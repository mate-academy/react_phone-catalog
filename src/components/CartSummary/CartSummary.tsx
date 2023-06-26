import { CartButton } from '../Buttons/CartButton/CartButton';
import './CartSummary.scss';

export const CartSummary = () => {
  return (
    <div className="cart-summary">
      <h2 className="cart-summary__title">3295$</h2>
      <p className="cart-summary__total">Total for 3 items</p>

      <CartButton width={320} height={48} />
    </div>
  );
};
