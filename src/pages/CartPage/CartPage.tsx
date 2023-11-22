/* eslint-disable react/button-has-type */
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  removeFromCart, decreaseQuantity, increaseQuantity,
} from '../../features/cartSlice';
import { CartItem } from '../../types/CartItem';
import { BackButton } from '../../components/BackButton';

import './cartPage.scss';

export const CartPage = () => {
  const { pathname } = useLocation();
  const [showMessage, setShowMessage] = useState(false);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cartItems);

  const handleShowMessage = () => {
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 4000);
  };

  const handleRemoveItem = (productItem: CartItem) => {
    dispatch(removeFromCart(productItem));

    const updatedCartItems = cartItems.filter(
      item => item.id !== productItem.id,
    );

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const totalPrice = cartItems.map(
    cartItem => cartItem.fullPrice * cartItem.quantity,
  );
  const totalAmount = totalPrice.reduce(
    (acc, currentValue) => acc + currentValue, 0,
  );

  const totalQuantityOfItems = cartItems.map(item => item.quantity);

  const allItems = totalQuantityOfItems.reduce(
    (acc, quantityPerEachItem) => acc + quantityPerEachItem, 0,
  );

  return (
    <div className="cartpage">
      <div className="container">
        <div className="cartpage__button-back">
          <BackButton />
        </div>

        <h1 className="title rainbow-text cartpage__title">
          Cart
        </h1>

        {cartItems.length > 0
          ? (
            <div className="cartpage__content">
              <div className="cartpage__items">
                {cartItems.map(cartItem => (
                  <div key={cartItem.id} className="cartpage__item">

                    <div className="cartpage__item-main">
                      <button
                        onClick={() => handleRemoveItem(cartItem)}
                        data-cy="cartDeleteButton"
                        className="cartpage__item-close-button"
                      >
                        <img
                          className="cartpage__item-close-icon"
                          src="new/img/icons/close.svg"
                          alt="close-icon"
                        />
                      </button>
                      <Link to={`${pathname}/${cartItem.itemId}`}>
                        <img
                          className="cartpage__item-img"
                          src={`new/${cartItem.image}`}
                          alt="item"
                        />
                      </Link>
                      <p className="cartpage__item-name">
                        {cartItem.name}
                      </p>
                    </div>

                    <div className="cartpage__item-buttons">
                      <button
                        className="cartpage__item-button-subtract"
                        onClick={() => dispatch(decreaseQuantity(cartItem.id))}
                      >
                        <img
                          className="cartpage__item-button-subtract-img"
                          src="new/img/icons/subtract-icon.svg"
                          alt="subtract-icon"
                        />
                      </button>

                      <p
                        data-cy="productQauntity"
                        className="cartpage__item-quantity"
                      >
                        {cartItem.quantity}
                      </p>
                      <button
                        className="cartpage__item-button-add"
                        onClick={() => dispatch(increaseQuantity(cartItem.id))}
                      >
                        <img
                          className="cartpage__item-button-add-img"
                          src="new/img/icons/add-icon.svg"
                          alt="add-icon"
                        />
                      </button>
                    </div>

                    <div className="cartpage__item-price">
                      $
                      {cartItem.fullPrice * cartItem.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cartpage__amount">
                <div className="cartpage__amount-total">
                  $
                  {totalAmount}
                </div>
                <div className="cartpage__amount-text">
                  {allItems === 1
                    ? `Total for ${allItems} item`
                    : `Total for ${allItems} items`}
                </div>

                <hr className="cartpage__amount-line" />

                <button
                  className="cartpage__amount-button"
                  onClick={handleShowMessage}
                >
                  Checkout
                </button>

                {showMessage && (
                  <p className="cartpage__checkout-message">
                    We are sorry, but this feature is not implemented yet
                  </p>
                )}
              </div>

            </div>
          ) : (
            <p className="cartpage__no-items">
              Your cart is empty
            </p>
          )}
      </div>
    </div>
  );
};
