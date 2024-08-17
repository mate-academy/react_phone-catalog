import { useEffect, useState } from 'react';
import { CartItem } from '../components/CartItem';
import { CardButton } from '../components/ui/CardButton';
import { GoBackLink } from '../components/ui/GoBackLink';
import { useCart } from '../hooks/useCart';

export const CartPage = () => {
  const { cart, updateCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(() =>
    cart.reduce((acc, item) => acc + item.price * (item.count || 1), 0),
  );
  const [totalItemCount, setTotalItemCount] = useState(() =>
    cart.reduce((acc, item) => acc + (item.count || 1), 0),
  );

  useEffect(() => {
    const totalInitialPrice = cart.reduce(
      (acc, item) => acc + item.price * (item.count || 1),
      0,
    );
    const totalInitialItems = cart.reduce(
      (acc, item) => acc + (item.count || 1),
      0,
    );

    setTotalPrice(totalInitialPrice);
    setTotalItemCount(totalInitialItems);
  }, [cart]);

  const updateTotalPrice = (
    itemPrice: number,
    count: number,
    type: 'increase' | 'decrease',
  ) => {
    setTotalPrice(
      prevPrice =>
        prevPrice +
        (type === 'increase' ? itemPrice * count : -itemPrice * count),
    );
  };

  const updateTotalItems = (count: number, type: 'increase' | 'decrease') => {
    setTotalItemCount(
      prevCount => prevCount + (type === 'increase' ? count : -count),
    );
  };

  return (
    <div className="cart-page" id="cart-page">
      <div className="cart-page__goback-link">
        <GoBackLink />
      </div>

      <div className="cart-page__title-block">
        <h2>Cart</h2>
      </div>

      <div className="cart-page__content">
        <div className="cart-page__wrapper">
          {cart.map(itemCart => (
            <CartItem
              key={itemCart.id}
              item={itemCart}
              updateCart={updateCart}
              onItemPrice={updateTotalPrice}
              onItemCount={updateTotalItems}
            />
          ))}
        </div>
        <div className="cart-page__total">
          <div className="cart-page__price-wrapper">
            <h2>${totalPrice}</h2>

            <p className="body-text body-text--gray">
              Total for {totalItemCount} {totalItemCount > 1 ? 'items' : 'item'}
            </p>
          </div>

          <CardButton
            style={{ height: '48px' }}
            variant="primary"
            /* eslint-disable-next-line no-console */
            onClick={() => console.log('Checkout')}
          >
            Checkout
          </CardButton>
        </div>
      </div>
    </div>
  );
};
