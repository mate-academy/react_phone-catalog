import React, { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocaleStorage';
import { useNavigate } from 'react-router-dom';

import { ExtendedProduct } from '../../types/Product';

import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductCardInCart } from '../../components/ProductCardInCart';
import { ButtonPrimary } from '../../components/UI/ButtonPrimary';

import styles from './Cart.module.scss';

export const Cart = () => {
  const [totalPriceAmount, setTotalPriceAmount] = useState(0);
  const [totalProductAmount, setTotalProductAmount] = useState(0);
  const [storedCart, setStoredCart] = useLocalStorage<ExtendedProduct[]>(
    'cart',
    [],
  );
  const navigate = useNavigate();

  const handleChangeAmount = useCallback(
    (type: 'increase' | 'decrease', id: number) => {
      let newAmount = 1;

      setStoredCart(prev =>
        prev.map(item => {
          if (item.id !== id) {
            return item;
          }

          const currentAmount = item.amount ?? 1;

          newAmount =
            type === 'increase'
              ? Math.min(currentAmount + 1, 10)
              : Math.max(currentAmount - 1, 1);

          return { ...item, amount: newAmount };
        }),
      );

      return newAmount;
    },
    [setStoredCart],
  );

  const handleRemoveFromCart = useCallback(
    (id: number) => {
      setStoredCart(prev => prev.filter(item => item.id !== id));
    },
    [setStoredCart],
  );

  const handleCheckout = () => {
    navigate('/checkout');
  };

  useEffect(() => {
    setTotalPriceAmount(
      storedCart.reduce((acc, p) => {
        if (p.amount) {
          return acc + p.amount * p.price;
        }

        return acc;
      }, 0),
    );

    setTotalProductAmount(
      storedCart.reduce((acc, p) => {
        if (p.amount) {
          return acc + p.amount;
        }

        return acc;
      }, 0),
    );
  }, [storedCart]);

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs />
        <div className="section-title-wrapper">
          <h1>Cart</h1>
        </div>
        {storedCart.length === 0 ? (
          <p className="main-text main-text--centered">Your Cart is empty</p>
        ) : (
          <div className={styles.cart__content}>
            <div className={styles['cart__order-wrapper']}>
              {storedCart.map(product => (
                <ProductCardInCart
                  key={product.id}
                  product={product}
                  amount={product.amount ?? 0}
                  handleChangeAmount={handleChangeAmount}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              ))}
            </div>
            <div className={styles['cart__checkout-wrapper']}>
              <h2>${totalPriceAmount}</h2>
              <p className="main-text">
                Total for {totalProductAmount}{' '}
                {totalProductAmount > 1 ? 'items' : 'item'}
              </p>
              <div className="divider"></div>
              <ButtonPrimary onClick={handleCheckout}>Checkout</ButtonPrimary>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
