import React, { useContext } from 'react';
import { BackButton } from '../../components/BackButton';
import { CartItem } from '../../components/CartItem/CartItem';
import { CartContext } from '../../context/CartContext';
import './CartPage.scss';

export const CartPage: React.FC = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="CartPage">
      <div className="container">
        <div className="CartPage__content">
          <div className="CartPage__top">
            <BackButton />
            <h2 className="CartPage__title">
              Cart
            </h2>
          </div>

          <div className="CartPage__main">
            {!!cart.length && (
              <ul className="CartPage__list">
                {cart.map(cartItem => (
                  <CartItem
                    key={cartItem.product.itemId}
                    item={cartItem}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
