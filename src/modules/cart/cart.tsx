import React from 'react';
import { useCart } from '../../utils/Cartcontext/cartcontext';
import styles from './cart.module.scss';
import { BackButton } from '../shared/buttonback/back';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

export const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    increaseAmount,
    decreaseAmount,
    totalItem,
    clearCart,
  } = useCart();
  const backPage = useNavigate();

  const handleClick = () => backPage(-1);

  const handleClearCart = () => {
    const clear = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (clear.valueOf()) {
      return clearCart();
    } else {
      return;
    }
  };

  return (
    <section className={styles.cart}>
      <div className={styles['cart__back-button-container']}>
        <img
          src="img/arrow.png"
          alt=""
          className={styles['cart__back-button-arrow']}
        />
        <BackButton onBack={handleClick} />
      </div>
      <h2 className={styles['cart__page-title']}>
        {cart.length === 0 ? 'Your cart is empty' : 'Cart'}
      </h2>
      <div className={styles['cart__container-grid']}>
        <ul className={styles.cart__list}>
          {cart.map(p => (
            <li className={styles.cart__item} key={p.itemId}>
              <div className={styles['cart__product-content']}>
                <div className={styles['cart__product-wrapper']}>
                  <button
                    onClick={() => removeFromCart(p.itemId)}
                    className={styles['cart__product-button-remove']}
                  >
                    <img
                      className={styles['cart__product-close']}
                      src="img/Close.png"
                      alt=""
                    />
                  </button>
                  <img
                    className={styles['cart__product-image']}
                    src={p.image}
                    alt=""
                  />
                  <p className={styles['cart__product-name']}>{p.name}</p>
                </div>
                <div className={styles['cart__product-action-container']}>
                  <div className={styles['cart__product-button-container']}>
                    <button
                      disabled={p.quantity === 1}
                      onClick={() => decreaseAmount(p)}
                      className={classNames(
                        styles['cart__product-button-change'],
                        {
                          [styles['cart__product-button-change--disabled']]:
                            p.quantity === 1,
                        },
                      )}
                    >
                      {' '}
                      <img src="/img/menos.png" alt="" />{' '}
                    </button>
                    <span>{p.quantity}</span>
                    <button
                      onClick={() => increaseAmount(p)}
                      className={styles['cart__product-button-change']}
                    >
                      {' '}
                      <img src="img/Plus.png" alt="" />
                    </button>
                  </div>
                  <p
                    className={styles['cart__product-price']}
                  >{`$${p.price * p.quantity}`}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles['cart__checkout-container-grid']}>
          <div className={styles['cart__checkout-container']}>
            <div className={styles['cart__checkout-content']}>
              <div>
                <p
                  className={styles['cart__checkout-sum']}
                >{`$${cart.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</p>
                <p
                  className={styles['cart__checkout-total-items']}
                >{`Total for ${totalItem} items`}</p>
              </div>
              <div className={styles['cart__checkout-button-container']}>
                <button
                  onClick={handleClearCart}
                  className={styles['cart__checkout-button']}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
