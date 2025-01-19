import React, { useState } from 'react';
import './Cart.scss';
import { CardCart } from './CardCart';
import { useCart } from '../../Context/CartContext';
import { CartProduct } from '../../type/Product';
import classNames from 'classnames';
import { PreviousPage } from '../../PartToPage/PreviousPage';
import { useTranslation } from 'react-i18next';
import { totalQuantity } from '../../../utils/CartUtils';

export const Cart: React.FC = () => {
  const { cartList, setCartList } = useCart();
  const cartItems = cartList ? Object.values(cartList) : [];
  const [orderMessage, setOrderMessage] = useState<string | null>(null);
  const { t } = useTranslation();

  const totalPrice = cartItems.reduce((total: number, item: CartProduct) => {
    if (item && item.product && item.product.price && item.quantity) {
      return total + item.product.price * item.quantity;
    }

    return total;
  }, 0);

  const SendOrder = () => {
    if (cartList) {
      setCartList({});
      setOrderMessage(t('orderSentMessage'));

      setTimeout(() => {
        setOrderMessage(null);
      }, 3000);
    }
  };

  const quantity = totalQuantity(cartItems);

  return (
    <div className="cart">
      {orderMessage ? (
        <div className="order-message">
          <h2 className="order-message--title cart__title text--h2">
            {orderMessage}
          </h2>
        </div>
      ) : (
        <div className="cart__content">
          <PreviousPage />
          <h1 className="cart__title text--h1">{t('cartPage.0')}</h1>

          <div className="cart__list">
            {cartItems.length > 0 ? (
              cartItems.map(item => {
                if (!item || !item.product) {
                  return null;
                }

                return (
                  <CardCart
                    key={item.product.id}
                    product={item.product}
                    quantity={item.quantity}
                  />
                );
              })
            ) : (
              <p className="cart__empty text--h3">
                {t('cartPageNull.0')}
                <br />
                {t('cartPageNull.1')}
              </p>
            )}
          </div>
          <div
            className={classNames('cart__button__block text--body', {
              'no-active': cartItems.length <= 0,
            })}
          >
            <div
              className={classNames('cart__button__block__text', {
                'cart__button__block__text--no-active': cartItems.length <= 0,
              })}
            >
              <h2 className="cart__button__block__price text--h2">
                ${totalPrice}
              </h2>

              {quantity !== 0 ? (
                <p className="cart__button__block__title">
                  {t('cartPage.1')} {quantity} {t('cartPage.2')}
                </p>
              ) : (
                <p className="cart__button__block__title">
                  {t('cartPage.1')} {t('cartPage.2')}
                </p>
              )}
            </div>
            <button
              className={classNames('cart__button', {
                'no-active': cartItems.length <= 0,
              })}
              onClick={SendOrder}
            >
              {t('cartPage.3')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
