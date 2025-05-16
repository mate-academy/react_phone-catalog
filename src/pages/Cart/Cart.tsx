import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocaleStorage';

import { Product } from '../../types/Product';

import { ProductCard } from '../../components/ProductCard';
import { ButtonPrimary } from '../../components/UI/ButtonPrimary';

import styles from './Cart.module.scss';

type Props = {
  products?: Product[];
};

export const Cart: React.FC<Props> = ({}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [storedCart] = useLocalStorage<Product[]>('cart', []);

  useEffect(() => {
    setProducts(storedCart);
  }, [storedCart]);

  return (
    <section className="section">
      <div className="container">
        <div className="section-title-wrapper">
          <h1>Cart</h1>
        </div>
        <div className={styles.cart__content}>
          <div className={styles['cart__order-wrapper']}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} variant="cart" />
            ))}
          </div>
          <div className={styles['cart__checkout-wrapper']}>
            <h2>${'1000'}</h2>
            <p className="main-text">Total for {products.length} items</p>
            <div className={styles['cart__checkout-divider']}></div>
            <ButtonPrimary>Checkout</ButtonPrimary>
          </div>
        </div>
      </div>
    </section>
  );
};
