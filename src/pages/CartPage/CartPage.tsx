import './CartPage.scss';

import classNames from 'classnames';
import { useContext, useRef, useState } from 'react';
import { Back } from '../../components/Back';
import { CartContext } from '../../contexts/CartContext';
import { MAIN_URL } from '../../helpers/api';

export const CartPage: React.FC = () => {
  const {
    cartItems,
    setCartItems,
    totalSum,
    totalQuantity,
  } = useContext(CartContext);
  const [isMessageShown, setIsMessageShown] = useState(false);
  const timeoutId = useRef(0);

  const MIN_ITEM_QUANTITY = 1;
  const MAX_ITEM_QUANTITY = 99;

  const deleteCartItem = (event: React.MouseEvent, itemId: string) => {
    event.preventDefault();

    const newCartItems = cartItems.filter(item => item.itemId !== itemId);

    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const increaseQuantity = (index: number) => {
    const cartItem = cartItems[index];

    if (cartItem.quantity === MAX_ITEM_QUANTITY) {
      return;
    }

    const newCartItems = [...cartItems];

    newCartItems.splice(index, 1, {
      ...cartItem,
      quantity: cartItem.quantity + 1,
    });

    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const decreaseQuantity = (index: number) => {
    const cartItem = cartItems[index];

    if (cartItem.quantity === MIN_ITEM_QUANTITY) {
      return;
    }

    const newCartItems = [...cartItems];

    newCartItems.splice(index, 1, {
      ...cartItem,
      quantity: cartItem.quantity - 1,
    });

    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const handleCheckoutClick = () => {
    window.clearTimeout(timeoutId.current);
    setIsMessageShown(true);
    timeoutId.current = window.setTimeout(() => setIsMessageShown(false), 3000);
  };

  return (
    <div className="CartPage">
      <div className="CartPage__back-wrapper">
        <Back />
      </div>

      <h1 className="CartPage__title title">Cart</h1>

      {!cartItems.length ? (
        <div className="CartPage__empty title">
          Your cart is empty
        </div>
      ) : (
        <div className="CartPage__content">
          <ul className="CartPage__list">
            {cartItems.map((item, index) => (
              <li key={item.itemId} className="CartPage__item">
                <button
                  type="button"
                  data-cy="cartDeleteButton"
                  className="CartPage__delete-button"
                  aria-label="Delete from cart"
                  onClick={e => deleteCartItem(e, item.itemId)}
                />

                <div className="CartPage__image-wrapper">
                  <img
                    src={`${MAIN_URL}/${item.product.image}`}
                    alt={item.product.name}
                    className="CartPage__image"
                  />
                </div>

                <span className="CartPage__name">{item.product.name}</span>

                <div className="CartPage__quantity-wrapper">
                  <button
                    type="button"
                    className="
                      CartPage__quantity-button
                      CartPage__quantity-button--decrease
                    "
                    aria-label="Decrease quantity"
                    onClick={() => decreaseQuantity(index)}
                    disabled={item.quantity === MIN_ITEM_QUANTITY}
                  />

                  <span
                    data-cy="productQauntity"
                    className="CartPage__quantity-value"
                  >
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    className="
                      CartPage__quantity-button
                      CartPage__quantity-button--increase
                    "
                    aria-label="Increase quantity"
                    onClick={() => increaseQuantity(index)}
                    disabled={item.quantity === MAX_ITEM_QUANTITY}
                  />
                </div>

                <span className="CartPage__price">
                  &#36;
                  {item.product.price}
                </span>
              </li>
            ))}
          </ul>

          <div className="CartPage__total-sum-wrapper">
            <div className="CartPage__total-sum">
              <div className="CartPage__total-sum-value-wrapper">
                <div className="CartPage__total-sum-value">
                  &#36;
                  {totalSum}
                </div>

                <span className="CartPage__total-sum-info">
                  {`Total for ${totalQuantity} items`}
                </span>
              </div>

              <button
                type="button"
                className="button button--height--48px"
                onClick={handleCheckoutClick}
              >
                Checkout
              </button>
            </div>

            <p
              className={classNames('CartPage__checkout-message', {
                'CartPage__checkout-message--show': isMessageShown,
              })}
            >
              We are sorry, but this feature is not implemented yet
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
