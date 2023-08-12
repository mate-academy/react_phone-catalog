import { useState, useMemo } from 'react';
import classNames from 'classnames';
import './Cart.scss';
import { Button } from '../../components/Button/Button';
import { GoBackButton } from '../../components/GoBackButton/GoBackButton';
import { calculateDiscount } from '../../utils/calculateDiscount';
import { Crumbs } from '../../components/Crumbs/Crumbs';
import { useAppSelector } from '../../app/hooks';
import { CartItem } from '../../components/CartItem/CartItem';
import { Product } from '../../types/Product';

export const Cart = () => {
  const cart = useAppSelector(state => state.cart);
  const [isActive, setIsActive] = useState(false);

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (acc: number, curr:
      { product: { price: number; discount: number; };
        quantity: number;
      }) => {
        return acc
      + (calculateDiscount(curr.product) * curr.quantity);
      }, 0,
    );
  }, [cart]);

  const handleCheckout = () => {
    setIsActive(true);

    setTimeout(() => {
      setIsActive(false);
    }, 3000);
  };

  return (
    <div className="Cart container">
      <div className="Cart__crumbs">
        <Crumbs />
      </div>

      <div className="Cart__return">
        <GoBackButton />
      </div>

      <div className="Cart__title">
        <h1>Cart</h1>
      </div>

      <div className={classNames(
        'Cart__checkout-message',
        { active: isActive },
      )}
      >
        <h2>
          We are sorry, but this feature is not implemented yet
        </h2>
      </div>

      {!cart.length
        ? (
          <h2 className="Cart__no-items-message">
            Your cart is empty
          </h2>
        )
        : (
          <div className="Cart__content grid">
            <div className="Cart__products">
              <ul className="Cart__products-list">
                {cart.map(
                  (item: {
                    id: string;
                    quantity: number;
                    product: Product;
                  }) => (
                    <li key={item.id}>
                      <CartItem item={item} />
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="Cart__checkout">
              <h2>{`$${totalPrice}`}</h2>

              <p>
                {`Total for ${cart.length} items`}
              </p>

              <Button
                content="cart"
                onClick={handleCheckout}
                disabled={isActive}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
    </div>
  );
};
