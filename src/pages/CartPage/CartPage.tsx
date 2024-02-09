import { useContext, useState } from 'react';
import { ButtonBack } from '../../components/ButtonBack';
import { CartItems } from '../../components/CartItems';
import { Checkout } from '../../components/Checkout';
import './CartPage.scss';
import { GlobalContext } from '../../GlobalContext';

export const CartPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { cartItems } = useContext(GlobalContext);

  return (
    <div className="CartPage">
      <div className="CartPage__button-back">
        <ButtonBack />
      </div>

      {cartItems.length ? (
        <>

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
        </>
      ) : (
        <h1 className="CartPage__title CartPage__title--empty">
          Your cart is empty
        </h1>
      )}
    </div>
  );
};
