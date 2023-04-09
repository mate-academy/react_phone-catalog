import classNames from 'classnames';
import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { BackButton } from '../components/BackButton';
import { CartItem } from '../components/CartItem';
import { ProductsContext } from '../context/ProductsContext';

export const CartPage: React.FC = () => {
  const { cartList } = useContext(ProductsContext);
  const [isNotificated, setIsNotificated] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => setIsNotificated(false), 3000);

    return () => clearTimeout(timerId);
  }, [isNotificated]);

  const totalPrice = useMemo(() => cartList.reduce((total, cur) => {
    return total + cur.price * cur.quantity;
  }, 0), [cartList]);

  return (
    <div className="cart-page">
      <div className="cart-page__content">
        <BackButton />
        <h1>Cart</h1>
      </div>
      <div className="cart-page-container">
        <ul className="cart-page-container__list">
          {cartList.length
            ? (cartList.map(cart => (
              <li
                key={cart.id}
              >
                <CartItem
                  cart={cart}
                />
              </li>
            ))
            ) : (

              <h2 className="cart-page__empty-list-message">
                Your cart is empty
              </h2>
            )}
        </ul>
        <div className="cart-total">
          <h1 className="cart-total__price">
            $
            {totalPrice}
          </h1>
          <div className="cart-total__value" data-cy="productQauntity">
            {`Total for ${cartList.length} items`}
          </div>
          <div className="cart-total__line" />
          <button
            className="cart-total__button"
            type="button"
            onClick={() => setIsNotificated(true)}
          >
            Checkout
          </button>
        </div>
      </div>
      <div
        className={classNames(
          'notification',
          { 'notification--active': isNotificated },
        )}
      >
        <h2 className="notification__title">
          We are sorry, but this feature is not implemented yet
        </h2>
      </div>
    </div>
  );
};
