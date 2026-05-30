import React from 'react';
import { useCart } from '../../store/CartContext';
import { CartContent } from './components/CartContent';
import { useNavigate } from 'react-router-dom';
import { CartEmpty } from './components/CartEmpty';

export const CartPage: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <section className="App__section" id="cart">
      <div className="App__section-content App__section-content">
        <span onClick={() => navigate(-1)} className="App__link">
          Back
        </span>
        <h1 className="App__h App__h--h1">Cart</h1>
        {cart.length === 0 ? <CartEmpty /> : <CartContent />}
      </div>
    </section>
  );
};
