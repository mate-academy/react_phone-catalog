import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { VITE_BASE_URL } from '../../utils/fetchClient';
import { useLocalStorage } from '../../hooks/useLocaleStorage';
import { ExtendedProduct, Product } from '../../types/Product';

import { NavLink } from 'react-router-dom';
import { ButtonPrimary } from '../UI/ButtonPrimary';
import { ButtonFavorite } from '../UI/ButtonFavorite';

import 'react-loading-skeleton/dist/skeleton.css';
import styles from './ProductCard.module.scss';

type Variant = 'default' | 'skeleton';

type ProductStatus = {
  inCart: boolean;
  isFavorite: boolean;
};

type Props = {
  product: Product;
  variant?: Variant;
};

export const ProductCard: React.FC<Props> = ({
  product,
  variant = 'default',
}) => {
  const [productStatus, setProductStatus] = useState<ProductStatus>({
    inCart: false,
    isFavorite: false,
  });

  const [storedCart, setStoredCart] = useLocalStorage<ExtendedProduct[]>(
    'cart',
    [],
  );
  const [storedFavorites, setStoredFavorites] = useLocalStorage<Product[]>(
    'favorites',
    [],
  );

  const toggleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setProductStatus(state => ({ ...state, inCart: !state.inCart }));

    setStoredCart(prev => {
      const exists = prev.some(p => p.id === product.id);

      return exists
        ? prev.filter(p => p.id !== product.id)
        : [...prev, { ...product, amount: 1 }];
    });
  };

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setProductStatus(state => ({ ...state, isFavorite: !state.isFavorite }));

    setStoredFavorites(prev => {
      const exists = prev.some(p => p.id === product.id);

      return exists
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product];
    });
  };

  useEffect(() => {
    if (storedFavorites.find(p => p.id === product.id)) {
      setProductStatus(state => ({ ...state, isFavorite: true }));
    }

    if (storedCart.find(p => p.id === product.id)) {
      setProductStatus(state => ({ ...state, inCart: true }));
    }
    //'storedCart' and 'storedFavorites' not needed in this dependencies
    // becouse this calling extra rerenders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

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

  return (
    <NavLink
      to={`/product/${product.itemId}`}
      className={styles['product-card']}
    >
      <div className={styles['product-card__image-wrapper']}>
        <img
          className={styles['product-card__image']}
          src={`${VITE_BASE_URL}/${product.image}`}
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
        {productStatus.inCart ? (
          <ButtonPrimary variant="selected" onClick={toggleCart}>
            Remove from cart
          </ButtonPrimary>
        ) : (
          <ButtonPrimary onClick={toggleCart}>Add to cart</ButtonPrimary>
        )}

        <ButtonFavorite
          selected={productStatus.isFavorite}
          onClick={toggleFavorite}
        />
      </div>
    </NavLink>
  );
};
