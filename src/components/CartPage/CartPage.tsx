import { useContext } from 'react';
import { CartContext } from '../contexts/CartContextProvider';
import { BackButton } from '../BackButton/BackButton';
import { CartItemList } from '../CartItemList/CarrtItemList';
import { CartInfo } from '../CartInfo/CartInfo';

export const CartPage = () => {
  const { cart } = useContext(CartContext);

  return (
    <section className="cart-page">
      <div className="cart-page__back-btn">
        <BackButton />
      </div>
      <h1 className="cart-page__tile">
        Cart
      </h1>
      <div className="cart-page__content">
        {cart.length > 0 ? (
          <>
            <div className="cart-page__list">
              <CartItemList />
            </div>

            <CartInfo />
          </>
        ) : (
          <h2 className="cart-page__message">
            Your cart is empty
          </h2>
        )}
      </div>
    </section>
  );
};
