import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContextProvider';
import { ButtonBack } from '../../components/Button/ButtonBack/ButtonBack';
import { CartItemList } from './CartItemList/CartItemList';
import { CartInfo } from './CartInfo/CartInfo';

import './CartPage.scss';

export const CartPage = () => {
  const { cart } = useContext(CartContext);

  return (
    <section className="cart-page container">
      <div className="cart-page--back-button">
        <ButtonBack />
      </div>

      <h1>
        Cart
      </h1>

      <div className="cart-page__content">
        {cart.length ? (
          <>
            <div className="cart-page__list">
              <CartItemList />
            </div>

            <CartInfo />
          </>
        ) : (
          <h2>
            Your cart is empty
          </h2>
        )}
      </div>
    </section>
  );
};
