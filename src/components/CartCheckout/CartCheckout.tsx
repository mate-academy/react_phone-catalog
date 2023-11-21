import { useMemo, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Product } from '../../types/Product';
import './CartCheckout.scss';

export const CartCheckout = () => {
  const { cart } = useAppSelector(state => state.favoriteAndCartProducts);
  const [isClicked, setIsClicked] = useState(false);

  const totalPrice = useMemo(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');

    return items.reduce((sum: number, curr: Product) => sum + curr.price, 0);
  }, [cart.length]);

  const handleClickButton = () => {
    let timer;

    clearInterval(timer);
    setIsClicked(true);

    timer = setTimeout(() => {
      setIsClicked(false);
    }, 5000);
  };

  return (
    <div className="
      cart__checkout
      checkout
      grid__item--desktop-17-24"
    >
      <div className="checkout__container">
        <div className="checkout__total-price">
          {`$${totalPrice}`}
        </div>

        <div
          data-cy="productQauntity"
          className="checkout__total-items"
        >
          {`Total for ${cart.length} item${cart.length === 1 ? '' : 's'}`}
        </div>

        <button
          className="checkout__button"
          type="button"
          onClick={handleClickButton}
        >
          {isClicked
            ? 'We are sorry, but this feature is not implemented yet'
            : 'Checkout'}
        </button>
      </div>
    </div>
  );
};
