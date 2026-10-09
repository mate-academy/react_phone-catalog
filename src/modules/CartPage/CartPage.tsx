import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import style from './CartPage.module.scss';
import '../../style/GlobalStyle.scss';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../../features/cartSlice';
import classNames from 'classnames';

export const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector(state => state.cart.items) || [];

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0,
  );

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div
          className={style['back-button']}
          onClick={() => navigate(-1)}
          style={{ cursor: 'pointer' }}
        >
          <img
            src="img/icons/arrowleft.svg"
            alt="Back"
            className={style['back-arrow']}
          />
          <p className={classNames(style['back-title'], 'small-text')}>Back</p>
        </div>

        <div>
          <p className={classNames(style.title, 'h1')}>Cart</p>
        </div>

        <div className={style.main}>
          {cartItems.length === 0 ? (
            <p className={style['empty-message']}>Your cart is empty</p>
          ) : (
            <div className={style.list}>
              {cartItems.map(item => {
                if (!item || !item.product) {
                  return null;
                }

                const { product, quantity } = item;
                const targetId = product.itemId || product.id;

                return (
                  <div key={targetId} className={style['gadget-cart']}>
                    <div className={style['left-data']}>
                      <button
                        type="button"
                        className={style['close-button']}
                        onClick={e => {
                          e.preventDefault();
                          dispatch(removeFromCart(targetId));
                        }}
                      >
                        <img src="img/icons/closedark.svg" alt="Remove" />
                      </button>

                      <Link
                        to={`/${product.category}/${product.itemId}`}
                        className={style['product-info']}
                      >
                        <img
                          src={`${product.image}`}
                          alt={product.name}
                          className={style['gadget-img']}
                        />
                        <p
                          className={classNames(
                            style['gadget-title'],
                            'body-text',
                          )}
                        >
                          {product.name}
                        </p>
                      </Link>
                    </div>

                    <div className={style['right-data']}>
                      <div className={style['count-block']}>
                        <button
                          type="button"
                          className={style['small-button']}
                          disabled={quantity <= 1}
                          onClick={e => {
                            e.preventDefault();
                            dispatch(
                              updateQuantity({
                                id: targetId,
                                quantity: quantity - 1,
                              }),
                            );
                          }}
                        >
                          -
                        </button>

                        <div className={classNames(style.count, 'body-text')}>
                          {quantity}
                        </div>

                        <button
                          type="button"
                          className={style['small-button']}
                          onClick={e => {
                            e.preventDefault();
                            dispatch(
                              updateQuantity({
                                id: targetId,
                                quantity: quantity + 1,
                              }),
                            );
                          }}
                        >
                          +
                        </button>
                      </div>
                      <p className={style['gadget-price']}>
                        ${product.price * quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className={style['total-price-block']}>
              <p className={classNames(style.price, 'h2')}>${totalPrice}</p>
              <p className={classNames(style.text, 'body-text')}>
                Total for {totalQuantity}{' '}
                {totalQuantity === 1 ? 'item' : 'items'}
              </p>
              <button
                type="button"
                className={classNames(style.checkout, 'body-text')}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
