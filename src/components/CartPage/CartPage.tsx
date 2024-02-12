import { BackButton } from '../BackButton';
import { SectionHeader } from '../SectionHeader';
import { CartItem } from '../CartItem/CartItem';
import { CartTotal } from '../CartTotal/CartTotal';
import './CartPage.scss';

export const CartPage = () => {
  return (
    <div className="cart">
      <div className="cart__back-button">
        <BackButton />
      </div>

      <div className="cart__title">
        <SectionHeader
          title="Cart"
        />
      </div>

      <div className="cart__main">
        <div className="cart__cards">
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <CartTotal />
      </div>
    </div>
  );
};
