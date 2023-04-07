import { useMemo } from 'react';
import { BackButton } from '../components/BackButton';
import { CartItem } from '../components/CartItem';
import { useLocalstorage } from '../utils/cartApi';

export const CartPage: React.FC = () => {
  const [cartList, setCartList] = useLocalstorage('cartList', []);

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
          {cartList.map(cart => (
            <li
              key={cart.id}
            >
              <CartItem
                cart={cart}
                setCartList={setCartList}
                cartList={cartList}
              />
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <div className="cart-total__price">
            {totalPrice}
          </div>
          <div className="cart-total__value">
            {`Total for ${cartList.length} items`}
          </div>
          <div className="cart-total__line" />
          <button
            className="cart-total__button"
            type="button"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
