import classNames from 'classnames';
import React, { useEffect, useState, useMemo } from 'react';
import { CartItem } from '../../types/CardItem';
import { BackButton } from '../BackButton';
import './CartPage.scss';

type Props = {
  productQuantity: number;
  onChangeQuantity: React.Dispatch<React.SetStateAction<number>>
};

export const CartPage: React.FC<Props> = React.memo((
  { productQuantity, onChangeQuantity },
) => {
  const [render, setRender] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const cartItems: CartItem[] = useMemo(() => (
    JSON.parse(localStorage.getItem('cartItems') || '')
  ), [render]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc: number, item) => {
      const { quantity } = item;
      const { discount, price } = item.product;

      return discount
        ? acc + quantity * Math.ceil(price - price / discount)
        : acc + quantity * price;
    }, 0);
  }, [cartItems]);

  const removeItem = (id: string) => {
    localStorage.setItem('cartItems', JSON.stringify(
      cartItems.filter((item: CartItem) => item.id !== id),
    ));

    setRender(!render);
  };

  useEffect(() => {
    const productsQuantyty
    = cartItems.reduce((acc: number, item: CartItem) => (
      acc + item.quantity
    ), 0);

    onChangeQuantity(productsQuantyty);
  }, [cartItems]);

  const changeQuantity = (id: string, action: string) => {
    localStorage.setItem('cartItems', JSON.stringify(
      cartItems.map((item: CartItem) => (
        item.id === id
          ? ({
            ...item,
            quantity: (action === 'plus'
              ? item.quantity + 1
              : item.quantity - 1),
          })
          : item
      )),
    ));

    onChangeQuantity(curr => (action === 'plus' ? curr + 1 : curr - 1));
    setRender(!render);
  };

  const changeShowMessage = () => {
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <section className="cart-page">
      <div className="container">
        <div className="cart-page__back-button">
          <BackButton />
        </div>
        <h2 className="title cart-page__title">
          Cart
        </h2>
        {cartItems.length ? (
          <div className="cart-page__columns">
            <div className="cart-page__column">
              <ul className="cart-page__cards">
                {cartItems.map(item => {
                  const { product } = item;

                  return (
                    <li
                      key={item.id}
                      className="card cart-page__card"
                    >
                      <button
                        key={item.id}
                        className="card__button"
                        type="button"
                        onClick={() => removeItem(item.id)}
                      >
                        <span className="card__button-icon" />
                      </button>
                      <img
                        src={product.imageUrl}
                        alt={product.type}
                        className="card__image"
                      />
                      <h3 className="card__title">
                        {product.name}
                      </h3>
                      <div className="card__count-box">
                        <button
                          className={classNames(
                            'count-button',
                            'card__count-button',
                            {
                              'count-button--is-disabled':
                              item.quantity === 1,
                            },
                          )}
                          type="button"
                          onClick={() => changeQuantity(item.id, 'minus')}
                        >
                          <span className="
                            count-button__icon
                            count-button__icon--minus"
                          />
                        </button>
                        <span className="card__count">
                          {item.quantity}
                        </span>
                        <button
                          className="count-button card__count-button"
                          type="button"
                          onClick={() => changeQuantity(item.id, 'plus')}
                        >
                          <span className="
                          count-button__icon
                          count-button__icon--plus"
                          />
                        </button>
                      </div>
                      <div className="card__price-box">
                        <span className="card__price">
                          $
                          {
                            !product.discount
                              ? product.price * item.quantity
                              : Math.ceil(
                                product.price
                                - product.price / product.discount,
                              ) * item.quantity
                          }
                        </span>
                      </div>

                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="cart-page__column">
              <div className="order-box cart-page__order-box">
                <div className="order-box__price">
                  $
                  {totalPrice}
                </div>
                <span className="order-box__text">
                  {`Total for ${productQuantity} ${productQuantity > 1 ? 'items' : 'item'}`}
                </span>
                <button
                  type="button"
                  className="button button--is-large order-box__button"
                  onClick={changeShowMessage}
                >
                  Checkout
                </button>
                <span className="order-box__message">
                  {showMessage
                && 'This functionality is not implemented yet'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <h3 className="info-text cart-page__info-text">
            No products added to cart
          </h3>
        )}
      </div>
    </section>
  );
});
