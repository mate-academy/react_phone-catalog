import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { GoBackButton } from '../components/GoBackButton/GoBackButton';
import { Cart } from '../components/Cart/Cart';

export const CartPage = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="container">
      <GoBackButton />

      <div className="cart">
        <h1 className="cart__title">Cart</h1>

        <div className="cart__main">
          {cartItems.length > 0 ? (
            <Cart />
          ) : (
            <p className="noResults">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>

  );
};
