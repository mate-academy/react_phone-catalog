import { useState } from 'react';
import { ButtonBack } from '../../components/ButtonBack';
import { CartItems } from '../../components/CartItems';
import { Checkout } from '../../components/Checkout';
import './CartPage.scss';

export const CartPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="CartPage">
      <div className="CartPage__button-back">
        <ButtonBack />
      </div>

      <h1 className="CartPage__title">
        Cart
      </h1>

      <div className="CartPage__list">
        <CartItems />
      </div>

      <div className="CartPage__checkout">
        <Checkout onSubmit={setIsVisible} />
      </div>

      {isVisible && (
        <div className="CartPage__checkout-answer">
          <h2 className="CartPage__checkout-answer--text">
            Sorry this feature not yet implemented
          </h2>
        </div>
      )}
    </div>
  );
};
