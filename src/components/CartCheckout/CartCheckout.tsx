import {
  useContext,
  useEffect,
  useState,
} from 'react';
import { Context } from '../Context';
import { Product } from '../../types/Product';
import './CartCheckout.scss';

export const CartCheckout: React.FC = () => {
  const { cart } = useContext(Context);

  const [isClicked, setIsClicked] = useState(false);

  const cartTotalPrice = () => {
    const currentItems = JSON.parse(localStorage.getItem('cart') || '[]');

    return currentItems.reduce(
      // eslint-disable-next-line max-len
      (sum: number, current: Product) => sum + (current.price - ((current.price / 100) * current.discount)), 0,
    );
  };

  const handleCheckoutClick = () => {
    let timer;

    clearInterval(timer);

    setIsClicked(true);

    timer = setTimeout(() => {
      setIsClicked(false);
    }, 5000);
  };

  useEffect(() => {
    cartTotalPrice();
  }, [cart.length]);

  return (
    <div
      className="
        cart__checkout
        checkout
        grid__item--tablet-1-12
        grid__item--desktop-17-24"
      data-cy="productQuantity"
    >
      <div className="checkout__total-price">
        {`$${cartTotalPrice()}`}
      </div>

      <p className="checkout__total-for">
        {`Total for ${cart.length} items`}
      </p>

      <button
        className="checkout__check-button"
        type="button"
        onClick={() => handleCheckoutClick()}
      >
        {isClicked
          ? 'We are sorry, but this feature is not implemented yet'
          : 'Checkout'}
      </button>
    </div>
  );
};
