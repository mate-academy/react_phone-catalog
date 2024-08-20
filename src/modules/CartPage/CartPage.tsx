import React, { useContext, useState } from 'react';
import './CartPage.scss';
import { BackBtn } from '../shared/BackBtn';
import { StateContext } from '../../contexts/AppContext/AppContext';
import { CartItem } from './components/CartItem';
import { Checkout } from './components/Checkout';
import { ModalCart } from './components/ModalCart';

export const CartPage: React.FC = () => {
  const { cart } = useContext(StateContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="cartPage container">
      <BackBtn />

      <h1 className="cartPage__title h1">Cart</h1>
      {!cart.length && (
        <p className="cartPage__noItems">Your cart is currently empty.</p>
      )}

      {!!cart.length && (
        <div className="cartPage__content">
          <div className="cartPage__products">
            {cart.map(item => (
              <CartItem key={item.id} cartItem={item} />
            ))}
          </div>
          <div className="cartPage__checkout">
            <Checkout setShowModal={setShowModal} />
          </div>
        </div>
      )}

      {showModal && <ModalCart setShowModal={setShowModal} />}
    </div>
  );
};
