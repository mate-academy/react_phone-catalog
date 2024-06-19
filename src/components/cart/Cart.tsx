import React, { useContext } from 'react';
import Styles from './Cart.module.scss';
import { ContextApp } from '../../appContext/AppContext';
import { CartCard } from './cartCard';
import { ItemWithQuantity } from '../../types/ItemWithQuantity';

export const Cart: React.FC = () => {
  const { cart } = useContext(ContextApp);

  return (
    <div className={Styles.cart}>
      <h1 className={Styles.cart__title}>Cart</h1>

      <div className={Styles.cart__items__container}>
        {cart.length > 0 &&
          cart.map(product => {
            return (
              <CartCard
                key={product.id}
                product={product as ItemWithQuantity}
              />
            );
          })}

        {cart.length === 0 && (
          <p className={Styles.cart__items__container__paragraph}>empty</p>
        )}
      </div>
    </div>
  );
};
