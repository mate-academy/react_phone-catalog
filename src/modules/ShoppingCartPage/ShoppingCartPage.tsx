import React, { useContext } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import { useLocation, useNavigate } from 'react-router-dom';
import './ShoppingCartPage.scss';
import { CartItem } from './components/CartItem';

export const ShoppingCartPage: React.FC = () => {
  const { shoppingCart, clearShoppingCart } = useContext(GlobalContext);

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const normalizeProductsType =
    pathname.slice(1, 2).toUpperCase() + pathname.slice(2);

  const countCartItems = shoppingCart.length;
  const totalQuantity = shoppingCart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const totalCount = shoppingCart.reduce((sum, item) => {
    return sum + item.quantity * item.product.price;
  }, 0);

  const handleCheckout = () => {
    const confirmed = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearShoppingCart(); // Очистка корзины через функцию контекста
    }
  };

  return (
    <div className="cartPage">
      <button className="cartPage__button-back" onClick={handleBack}>
        Back
      </button>
      <h1 className="cartPage__title">{normalizeProductsType}</h1>

      {countCartItems === 0 && (
        <div className="cartPage__empty-content">
          <span className="cartPage__empty-content-title">
            Your cart is empty
          </span>
          <img
            src="img/cart-is-empty.png"
            alt="Empty shopping cart"
            className="cartPage__image-empty"
          />
        </div>
      )}

      {countCartItems !== 0 && (
        <div className="cartPage__content">
          <div className="cartPage__content-container">
            {shoppingCart.map(item => (
              <CartItem cartProduct={item} key={item.id} />
            ))}
          </div>

          <div className="cartPage__total">
            <span className="cartPage__total-count">${totalCount}</span>
            <span className="cartPage__total-title">
              Total for {totalQuantity} items
            </span>
            <div className="cartPage__line"></div>
            <button
              className="cartPage__button-checkout"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
