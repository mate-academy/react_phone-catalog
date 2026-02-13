import './ShoppingCartPage.scss';
import { FC, useCallback, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import { CartItem } from './components/CartItem';
import { ButtonBack } from '../shared/ButtonBack';
import { CartTotals } from './types/types';

export const ShoppingCartPage: FC = () => {
  const { cart, clearShoppingCart } = useContext(GlobalContext);
  const { pathname } = useLocation();

  const pageTitle = useMemo(() => {
    const productType = pathname.slice(1);

    return productType.charAt(0).toUpperCase() + productType.slice(1);
  }, [pathname]);

  const cartTotals = useMemo((): CartTotals => {
    return cart.reduce(
      (totals, { quantity, product: { price } }) => ({
        totalPrice: totals.totalPrice + quantity * price,
        totalItems: totals.totalItems + quantity,
      }),
      { totalPrice: 0, totalItems: 0 },
    );
  }, [cart]);

  const handleCheckout = useCallback(() => {
    const isConfirmed = window.confirm(
      `Checkout doesn’t exist yet. Care to wipe the cart and start your imaginary shopping over?`,
    );

    if (isConfirmed) {
      clearShoppingCart();
    }
  }, [clearShoppingCart]);

  const isEmpty = cart.length === 0;

  const renderEmptyCart = () => (
    <div className="cartPage__empty-content">
      <span className="cartPage__empty-content-title">Your cart is empty</span>
      <img
        src="img/cart-is-empty.png"
        alt="Empty shopping cart"
        className="cartPage__image-empty"
      />
    </div>
  );

  const renderCartContent = () => (
    <div className="cartPage__content">
      <div className="cartPage__content-container">
        {cart.map(item => (
          <CartItem cartProduct={item} key={item.id} />
        ))}
      </div>

      <div className="cartPage__total">
        <div className="cartPage__total-count">${cartTotals.totalPrice}</div>
        <div className="cartPage__total-title">
          Total for {cartTotals.totalItems} items
        </div>
        <div className="cartPage__line" />
        <button className="cartPage__button-checkout" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );

  return (
    <div className="cartPage">
      <ButtonBack />
      <h1 className="cartPage__title">{pageTitle}</h1>
      {isEmpty ? renderEmptyCart() : renderCartContent()}
    </div>
  );
};
