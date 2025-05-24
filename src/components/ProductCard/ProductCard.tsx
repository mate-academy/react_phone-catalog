import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useLocalStorage } from '../../hooks/useLocaleStorage';
import { Product } from '../../types/Product';

import { NavLink } from 'react-router-dom';
import { ButtonPrimary } from '../UI/ButtonPrimary';
import { ButtonFavorite } from '../UI/ButtonFavorite';

import 'react-loading-skeleton/dist/skeleton.css';
import styles from './ProductCard.module.scss';

type Variant = 'default' | 'cart' | 'skeleton';

type Props = {
  product: Product;
  variant?: Variant;
};

export const ProductCard: React.FC<Props> = ({
  product,
  variant = 'default',
}) => {
  const [amount, setAmount] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [storedCart, setStoredCart] = useLocalStorage<Product[]>('cart', []);
  const [storedFavorites, setStoredFavorites] = useLocalStorage<Product[]>(
    'favorites',
    [],
  );

  const toggleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setInCart(state => !state);

    setStoredCart(prev => {
      const exists = prev.some(p => p.id === product.id);

      return exists
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product];
    });
  };

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsFavorite(state => !state);

    setStoredFavorites(prev => {
      const exists = prev.some(p => p.id === product.id);

      return exists
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product];
    });
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

  useEffect(() => {
    if (storedFavorites.find(p => p.id === product.id)) {
      setIsFavorite(true);
    }

    if (storedCart.find(p => p.id === product.id)) {
      setInCart(true);
    }
  }, [storedFavorites, storedCart, product.id]);

  if (variant === 'skeleton') {
    return (
      <div className={styles['product-card']}>
        <Skeleton height={150} />
        <Skeleton width="100%" className="mt-1" />
        <Skeleton width="60%" className="mt-1" />
        <Skeleton width="100%" className="mt-1" />
        <Skeleton width="100%" className="mt-1" />
        <Skeleton width="100%" className="mt-1" />
        <Skeleton height={40} />
      </div>
    );
  }

  if (variant === 'cart') {
    return (
      <article
        className={`${styles['product-card']} ${styles['product-card--cart']}`}
      >
        <div className={styles['product-card__price-details-wrapper--cart']}>
          <button className="button-box button--arrow-top"></button>
          <div className={styles['product-card__image-wrapper--cart']}>
            <img
              className={`${styles['product-card__image']} ${styles['product-card__image--cart']}`}
              src={`/${product.image}`}
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
    <NavLink
      to={`/product/${product.itemId}`}
      className={styles['product-card']}
    >
      <div className={styles['product-card__image-wrapper']}>
        <img
          className={styles['product-card__image']}
          src={`/${product.image}`}
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
          <ButtonPrimary variant="selected" onClick={toggleCart}>
            Remove from cart
          </ButtonPrimary>
        ) : (
          <ButtonPrimary onClick={toggleCart}>Add to cart</ButtonPrimary>
        )}

        <ButtonFavorite selected={isFavorite} onClick={toggleFavorite} />
      </div>
    </NavLink>
  );
};
