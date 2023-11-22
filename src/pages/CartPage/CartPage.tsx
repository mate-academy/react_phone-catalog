import { useContext } from 'react';
import { BackButton } from '../../components/BackButton/BackButton';
import './CartPage.scss';
import { CartItemList } from '../../components/CartItemList/CartItemList';
import { CartContext } from '../../components/contexts/CartContextProvider';
import { CartInfo } from '../../components/CartInfo/CartInfo';

export const CartPage = () => {
  const { cart } = useContext(CartContext);

  return (
    <section className="cart-page">
      <div className="cart-page__back-btn">
        <BackButton />
      </div>
      <h1 className="cart-page__title">Cart</h1>

      <div className="cart-page__content">
        {cart.length ? (
          <>
            <div className="cart-page__list">
              <CartItemList />
            </div>

            <CartInfo />
          </>
        ) : (
          <h2 className="cart-page__message">Your cart is empty</h2>
        )}
      </div>
    </section>
  );
};
