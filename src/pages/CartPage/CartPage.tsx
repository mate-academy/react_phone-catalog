import React, { useState } from 'react';
import { Product } from '../../types/Product';

import './Cart.scss';

export const CartPage: React.FC = () => {
  let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const [isCheckoutClicked, setIsCheckoutClicked] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const realCartItems = cartItems.filter(
    (product: Product, index: number, self: Product[]) => (
      index === self.findIndex((targetProduct) => (
        targetProduct.name === product.name
      ))
    ),
  );

  const handleCheckoutClick = () => {
    let timerId;

    clearInterval(timerId);
    setIsCheckoutClicked(true);
    timerId = setTimeout(() => {
      setIsCheckoutClicked(false);
    }, 2000);
  };

  const handleDeleteClick = (item: Product) => {
    cartItems = cartItems.filter((product: Product) => (
      product.name !== item.name
    ));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setIsUpdated(!isUpdated);
    window.dispatchEvent(new Event('storage'));
  };

  const handleIncreaseButton = (item: Product) => {
    const currentItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    localStorage.setItem('cartItems',
      JSON.stringify([...currentItems, item]));

    setIsUpdated(!isUpdated);
  };

  const handleDecreaseButton = (item: Product) => {
    const currentItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    const itemLastIndex = currentItems.findLastIndex((currentItem: Product) => (
      item.id === currentItem.id
    ));

    currentItems.splice(itemLastIndex, 1);
    localStorage.setItem('cartItems',
      JSON.stringify([...currentItems]));

    setIsUpdated(!isUpdated);
  };

  return (
    <div className="category-page cart">
      <div
        className="category-page__back"
        onClick={() => window.history.back()}
      >
        <img
          src="img/icons/prev-arrow.svg"
          alt="back-arrow"
        />

        <p className="status__title">Back</p>
      </div>

      <div className="section__title section__title--is-cart">
        Cart
      </div>

      {!cartItems.length
        ? (
          <h1
            className="cart__empty-phrase"
          >
            Your cart is empty
          </h1>
        ) : (
          <div className="cart__list--container">
            <ul className="cart__list">
              {realCartItems.map((item: Product) => (
                <li
                  className="cart__item"
                  key={item.id}
                >
                  <div
                    data-cy="cartDeleteButton"
                    className="cart__item--close-icon"
                    onClick={() => handleDeleteClick(item)}
                  />

                  <div className="cart__image--container">
                    <img
                      src={item.imageUrl}
                      alt="product"
                      className="cart__image"
                    />
                  </div>

                  <div className="cart__title">
                    {item.name}
                  </div>

                  <div className="cart__buttons buttons">
                    <button
                      type="button"
                      className="buttons__button"
                      disabled={cartItems.filter((prod: Product) => (
                        prod.id === item.id
                      )).length === 1}
                      onClick={() => handleDecreaseButton(item)}
                    >
                      <img
                        src={(cartItems.filter((prod: Product) => (
                          prod.id === item.id
                        )).length === 1)
                          ? 'img/icons/minus.svg'
                          : 'img/icons/minus-active.svg'}
                        alt="minus"
                      />
                    </button>

                    <div
                      className="cart__quantity"
                      data-cy="productQauntity"
                    >
                      {cartItems.filter((cartItem: Product) => (
                        item.name === cartItem.name)).length}
                    </div>

                    <button
                      type="button"
                      className="buttons__button"
                      onClick={() => handleIncreaseButton(item)}
                    >
                      <img
                        src="img/icons/plus.svg"
                        alt="plus"
                      />
                    </button>
                  </div>

                  <div className="cart__price">
                    {`$${item.price}`}
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart__checkout-block checkout-block">
              <div className="checkout-block__total-price">
                {`$${cartItems.reduce((accum: number, current: Product) => accum + current.price, 0)}`}
              </div>

              <p className="checkout-block__total-for">
                {`Total for ${cartItems.length} items`}
              </p>

              <button
                type="button"
                className="checkout-block__check-button"
                onClick={handleCheckoutClick}
              >
                Checkout

                {isCheckoutClicked && (
                  <div className="checkout-block__feature">
                    We are sorry, but this feature is not implemented yet
                  </div>
                )}
              </button>
            </div>
          </div>
        )}
    </div>
  );
};
