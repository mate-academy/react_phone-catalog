import React, { useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard';

import styles from './Cart.module.scss';
import { ButtonPrimary } from '../../components/UI/ButtonPrimary';

type Props = {
  products?: Product[];
};

export const Cart: React.FC<Props> = ({}) => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      category: 'phones',
      itemId: 'apple-iphone-7-32gb-black',
      name: 'Apple iPhone 7 32GB Black',
      fullPrice: 400,
      price: 375,
      screen: "4.7' IPS",
      capacity: '32GB',
      color: 'black',
      ram: '2GB',
      year: 2016,
      image: 'img/phones/apple-iphone-7/black/00.webp',
    },
  ]);

  return (
    <section className="section">
      <div className="container">
        <div className="section-title-wrapper">
          <h1>Cart</h1>
        </div>
        <div className={styles.cart__content}>
          <div className="cart__order-wrapper">
            {products.map(product => (
              <ProductCard key={product.id} product={product} variant="cart" />
            ))}
          </div>
          <div className={styles['cart__checkout-wrapper']}>
            <h2>${'1000'}</h2>
            <p className="main-text">Total for {'1'} items</p>
            <div className={styles['cart__checkout-divider']}></div>
            <ButtonPrimary>Checkout</ButtonPrimary>
          </div>
        </div>
      </div>
    </section>
  );
};
