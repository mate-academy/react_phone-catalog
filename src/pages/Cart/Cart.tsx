/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useState,
  useMemo,
} from 'react';
import classNames from 'classnames';
import './Cart.scss';
import { Button } from '../../components/Button/Button';
import { GoBackButton } from '../../components/GoBackButton/GoBackButton';
import { calculateDiscount } from '../../helpers/calculateDiscount';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  decreaseQuantity,
  increaseQuantity,
  remove,
} from '../../features/cart/cartSlice';

export const Cart = () => {
  const [isActive, setIsActive] = useState(false);
  const cart = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, curr) => {
      return acc + (calculateDiscount(curr.product) * curr.quantity);
    }, 0);
  }, [cart]);

  const handleDeleteItem = (id: string) => {
    dispatch(remove(id));
  };

  const handleIncreaseQuantity = (itemId: string) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId: string) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handleCheckout = () => {
    setIsActive(true);

    setTimeout(() => {
      setIsActive(false);
    }, 3000);
  };

  return (
    <div className="Cart container">
      <div className="Cart__breadcrumbs">
        <Breadcrumbs />
      </div>

      <div className="Cart__return">
        <GoBackButton />
      </div>

      <div className="Cart__title">
        <h1>
          Cart
        </h1>
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
            Your cart is empty 🧐
          </h2>
        )
        : (
          <div className="Cart__content grid">
            <div className="Cart__products">
              <ul className="Cart__products-list">
                {cart.map(item => (
                  <li className="Cart__products-item" key={item.id}>
                    <div className="Cart__item">
                      <button
                        className="Cart__item-delete"
                        type="button"
                        data-cy="cartDeleteButton"
                        onClick={handleDeleteItem.bind(null, item.product.id)}
                      />

                      <div className="Cart__item-image">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                        />
                      </div>

                      <div className="Cart__item-title">
                        {item.product.name}
                      </div>

                      <div className="Cart__item-quantity">
                        <Button
                          variant="quantity"
                          sign="minus"
                          disabled={item.quantity === 1}
                          onClick={() => handleDecreaseQuantity(item.id)}
                        />

                        <span
                          data-cy="productQauntity"
                        >
                          {item.quantity}
                        </span>

                        <Button
                          variant="quantity"
                          sign="plus"
                          onClick={() => handleIncreaseQuantity(item.id)}
                        />
                      </div>

                      <div className="Cart__item-price">
                        <h2>
                          {`$${calculateDiscount(item.product)}`}
                        </h2>
                      </div>

                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="Cart__checkout">
              <h2>
                {`$${totalPrice}`}
              </h2>

              <p>
                {`Total for ${cart.length} items`}
              </p>

              <Button
                variant="cart"
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
