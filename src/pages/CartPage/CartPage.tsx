import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { BackButton } from '../../components/BackButton';
import { CartList } from '../../components/CartList';
import { CartInfo } from '../../components/CartInfo';
import './CartPage.scss';

export const CartPage = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <section className="cart page__section">
      <BackButton />
      <h1 className="cart__title">Cart</h1>

      {cartItems.length > 0 ? (
        <div className="cart__container grid">
          <CartList />
          <CartInfo />
        </div>
      ) : (
        <h2 className="no-results__title">Your shopping cart is empty</h2>
      )}
    </section>
  );
};
