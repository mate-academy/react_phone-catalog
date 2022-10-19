import React, { useContext } from 'react';
import { BackButton } from '../../BackButton';
import { CartListItems } from '../../CartListItems';
import { CartContext } from '../../CartProvider';
import { CartTotal } from '../../CartTotal';

export const CartPage: React.FC = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="cartPage page__cartPage">
      <BackButton />
      <h1 className="cartPage__title">
        {cart.length ? 'Cart' : 'Your cart is empty'}
      </h1>
      <div className="cartPage__content">
        <CartListItems />
        {cart.length > 0 && <CartTotal />}
      </div>
    </div>
  );
};
