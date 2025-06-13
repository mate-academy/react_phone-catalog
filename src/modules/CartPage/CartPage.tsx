/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import { Link } from 'react-router-dom';

import { RootState } from 'app/store';
import { useDispatch, useSelector } from 'react-redux';

import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../features/cart/cartSlice';
import { Divider } from '../../shared/components/ui/Divider';
import { GoBack } from '../../shared/components/ui/GoBack';
import { Icon } from '../../shared/components/ui/Icon/Icon';
import { IconNames } from '../../shared/components/ui/Icon/IconNames';
import { PrimaryButton } from '../../shared/components/ui/PrimaryButton';
import { NormalizedProduct } from '../../shared/helpers/normalizeProductType';

import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product: NormalizedProduct) => {
    dispatch(removeFromCart(product.id));
  };

  const handleIncrement = (product: NormalizedProduct) => {
    dispatch(increaseQuantity(product.id));
  };

  const handleDecrement = (product: NormalizedProduct) => {
    dispatch(decreaseQuantity(product.id));
  };

  return (
    <article className={styles.cartWrapper}>
      <header>
        <nav aria-label="back" className={styles.navigation}>
          <GoBack />
        </nav>
        <h1 className={styles.title}>Cart</h1>
      </header>

      {cartItems.length !== 0 ? (
        <div className={styles.cartInfo}>
          <ul className={styles.cartList}>
            {cartItems.map(item => (
              <li key={item.product.id}>
                <article className={styles.cartItem}>
                  <div className={styles.topRow}>
                    <button
                      type="button"
                      onClick={() => handleRemoveFromCart(item.product)}
                    >
                      <Icon
                        className={styles.crossIcon}
                        name={IconNames.Cross}
                      />
                    </button>
                    <Link
                      className={styles.imageWrapper}
                      to={`/${item.product.category}/${item.product.id}`}
                    >
                      <img alt={item.product.name} src={item.product.image} />
                    </Link>

                    <Link
                      className={styles.itemName}
                      to={`/${item.product.category}/${item.product.id}`}
                    >
                      {item.product.name}
                    </Link>
                  </div>

                  <div className={styles.bottomRow}>
                    <div className={styles.counter} role="group">
                      <button
                        className={styles.counterButton}
                        onClick={() => handleDecrement(item.product)}
                      >
                        <Icon name={IconNames.Minus} />
                      </button>

                      <output className={styles.counterValue}>
                        {item.quantity}
                      </output>

                      <button
                        className={styles.counterButton}
                        onClick={() => handleIncrement(item.product)}
                      >
                        <Icon name={IconNames.Plus} />
                      </button>
                    </div>

                    <div
                      className={styles.price}
                    >{`$${item.product.price}`}</div>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className={styles.totalItems}>
            <div className={styles.totalInfo}>
              <p className={styles.totalPrice}>{`$Total`}</p>
              <p
                className={styles.totalQuantity}
              >{`Total for QUANTITY items`}</p>
            </div>
            <Divider />

            <PrimaryButton />
          </div>
        </div>
      ) : (
        <section className={styles.empty}>
          <img
            alt="Illustration of an empty cart"
            className={styles.emptyImage}
            src="/images/empty-cart.png"
          />
          <p>Your cart is empty</p>
        </section>
      )}
    </article>
  );
};
