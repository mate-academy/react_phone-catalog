import React, { useContext } from 'react';
import { BackButton } from '../../components/BackButton';
import { CartCheckout } from '../../components/CartCheckout/CartCheckout';
import { CartContext } from '../../components/CartContext';
import { CartItem } from '../../components/CartItem';
import './CartPage.scss';

export const CartPage: React.FC = () => {
  const { cart } = useContext(CartContext);

  return (
    <>
      {cart.length === 0 ? (
        <>
          <div className="page__back-button page__back-button--cart-page">
            <BackButton />
          </div>
          <h1>Your cart is empty...</h1>
        </>
      ) : (
        <>
          <div
            className="
          page__back-button
          page__back-button--cart-page
        "
          >
            <BackButton />
          </div>

          <h1 className="page__title page__title--cart-page">
            Cart
          </h1>

          <div className="page__cart-items cart-items">
            <ul className="cart-items__list">
              {cart.map(({ id, product, quantity }) => (
                <CartItem
                  key={id}
                  product={product}
                  quantity={quantity}
                />
              ))}
            </ul>
            <div className="cart-items__checkout">
              <CartCheckout />
            </div>
          </div>
        </>
      )}
    </>
  );
};
