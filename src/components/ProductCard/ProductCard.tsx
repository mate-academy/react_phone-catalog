import React, { useState } from 'react';
import styles from './ProductCard.module.scss';

import { Product } from '../../types/Product';
import { ButtonPrimary } from '../UI/ButtonPrimary';
import { ButtonFavorite } from '../UI/ButtonFavorite';

type Variant = 'default' | 'cart';

type Props = {
  product?: Product;
  variant?: Variant;
};

export const ProductCard: React.FC<Props> = ({ variant = 'default' }) => {
  const [product] = useState<Product>({
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
  });
  const [amount, setAmount] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    setInCart(state => !state);
  };

  const handleAddToFavorite = () => {
    setIsFavorite(state => !state);
  };

  const handleChangeAmount = (type: 'increase' | 'decrease') => {
    switch (type) {
      case 'increase': {
        setAmount(state => (state < 10 ? state + 1 : state));
        break;
      }

      case 'decrease': {
        setAmount(state => (state > 1 ? state - 1 : state));
        break;
      }
    }
  };

  if (variant === 'cart') {
    return (
      <article
        className={`${styles['product-card']} ${styles['product-card--cart']}`}
      >
        <div className={styles['product-card__price-details-wrapper--cart']}>
          <button className="button-box button--arrow-top"></button>
          <div className={styles['product-card__image-wrapper--cart']}>
            <img
              className={styles['product-card__image']}
              src={product.image}
              alt="Product Photo"
            />
          </div>
          <p className="main-text">{product.name}</p>
        </div>
        <div className={styles['product-card__price-details--cart']}>
          <div
            className={
              styles['product-card__price-details-amount-wrapper--cart']
            }
          >
            <button
              className="button-box button-box--sm button--arrow-left"
              onClick={() => handleChangeAmount('decrease')}
            ></button>
            <p
              className={`main-text ${styles['product-card__price-details-amount']}`}
            >
              {amount}
            </p>
            <button
              className="button-box button-box--sm button--arrow-right"
              onClick={() => handleChangeAmount('increase')}
            ></button>
          </div>
          <h3>${product.price * amount}</h3>
        </div>
      </article>
    );
  }

  return (
    <article className={styles['product-card']}>
      <div className={styles['product-card__image-wrapper']}>
        <img
          className={styles['product-card__image']}
          src={product.image}
          alt="Product Photo"
        />
      </div>
      <p className="main-text">{product.name}</p>
      <h3>
        ${product.price}{' '}
        {product.fullPrice && (
          <span className="main-text--secondary price-discount">
            ${product.fullPrice}
          </span>
        )}
      </h3>
      <div className={styles['product-card__divider']}></div>
      <p
        className={`${styles['product-card__description']} main-text main-text--secondary`}
      >
        Screen <span className="main-text--primary">{product.screen}</span>
      </p>
      <p
        className={`${styles['product-card__description']} main-text main-text--secondary`}
      >
        Capacity <span className="main-text--primary">{product.capacity}</span>
      </p>
      <p
        className={`${styles['product-card__description']} main-text main-text--secondary`}
      >
        RAM <span className="main-text--primary">{product.ram}</span>
      </p>
      <div className={styles['product-card__buttons-wrapper']}>
        {inCart ? (
          <ButtonPrimary variant="selected" onClick={handleAddToCart}>
            Remove from cart
          </ButtonPrimary>
        ) : (
          <ButtonPrimary onClick={handleAddToCart}>Add to cart</ButtonPrimary>
        )}

        <ButtonFavorite selected={isFavorite} onClick={handleAddToFavorite} />
      </div>
    </article>
  );
};
