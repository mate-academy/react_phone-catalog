import { useContext } from 'react';
import { StateContext } from '../../components/Store';
import { CartItems } from '../../components/CartItems';
import { CartTotal } from '../../components/CartTotal';
import { Back } from '../../components/Back';

import './style.scss';

export const CartPage = () => {
  const { cartItems } = useContext(StateContext);

  return (
    <section className="cartPage">
      <div className="cartPage__backLink"><Back /></div>
      <h1 className="cartPage__title">Cart</h1>
      {!cartItems.length ? (
        <h1>Your cart is empty</h1>
      ) : (
        <div className="cartPage__content">
          <CartItems />
          <CartTotal />
        </div>
      )}
    </section>
  );
};
