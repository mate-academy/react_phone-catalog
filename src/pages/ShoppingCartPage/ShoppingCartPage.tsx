import './ShoppingCartPage.scss';
import { FC, useCallback, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import { CartItem } from './components/CartItem';
import { ButtonBack } from '../shared/ButtonBack';

export const ShoppingCartPage: FC = () => {
  const { cart, clearShoppingCart } = useContext(GlobalContext);

  const { pathname } = useLocation();

  const normalizeProductsType = useMemo(
    () => pathname.slice(1, 2).toUpperCase() + pathname.slice(2),
    [pathname],
  );

  const { totalCount, totalQuantity } = useMemo(() => {
    let cartQuantity = 0;
    let cartCount = 0;

    for (const {
      quantity,
      product: { price },
    } of cart) {
      cartQuantity += quantity;
      cartCount += quantity * price;
    }

    return { totalQuantity: cartQuantity, totalCount: cartCount };
  }, [cart]);

  const handleCheckout = useCallback(() => {
    const confirmed = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearShoppingCart();
    }
  }, [clearShoppingCart]);

  return (
    <div className="cartPage">
      <ButtonBack />

      <h1 className="cartPage__title">{normalizeProductsType}</h1>

      {!cart.length ? (
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
      ) : null}

      {cart.length ? (
        <div className="cartPage__content">
          <div className="cartPage__content-container">
            {cart.map(item => (
              <CartItem cartProduct={item} key={item.id} />
            ))}
          </div>

          <div className="cartPage__total">
            <div className="cartPage__total-count">${totalCount}</div>
            <div className="cartPage__total-title">
              Total for {totalQuantity} items
            </div>
            <div className="cartPage__line"></div>
            <button
              className="cartPage__button-checkout"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
