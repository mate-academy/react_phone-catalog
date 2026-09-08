import { FC, memo } from 'react';
import { Product } from '../../types/Product';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavouritesContext';
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import { icons } from '../../constants/icons';
import classNames from 'classnames';

import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
  displayType: 'fullprice' | 'discount';
}

export const ProductCard: FC<Props> = memo(({ product, displayType }) => {
  const { cart, addToCart } = useCart();
  const isInCart = cart.some(
    (item: { id: string }) => item.id === String(product.id),
  );

  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(String(product.id));

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product);
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(String(product.id));
  };

  return (
    <div className={styles.card}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.card__image}
      >
        <img src={product.image} alt={product.name} />
      </Link>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.card__title}
        style={{ textDecoration: 'none' }}
      >
        <span>{product.name}</span>
      </Link>
      {displayType === 'fullprice' && (
        <span className={styles['card__price-regular']}>${product.price}</span>
      )}

      {displayType === 'discount' && (
        <div className={styles['card__price-container']}>
          <span className={styles['card__price-regular']}>
            ${product.price}
          </span>
          <span className={styles['card__price-discount']}>
            ${product.fullPrice}
          </span>
        </div>
      )}

      <span className={styles.card__decor}></span>

      <div className={styles.card__info}>
        <div className={styles['card__info-container']}>
          <span className={styles['card__info-container__name']}>Screen</span>
          <span>{product.screen}</span>
        </div>
        <div className={styles['card__info-container']}>
          <span className={styles['card__info-container__name']}>Capacity</span>
          <span>{product.capacity}</span>
        </div>
        <div className={styles['card__info-container']}>
          <span className={styles['card__info-container__name']}>RAM</span>
          <span>{product.ram}</span>
        </div>
      </div>

      <div className={styles.card__buttons}>
        <button
          className={classNames(
            styles.card__button,
            styles['card__button-cart'],
            { [styles['card__button-cart--active']]: isInCart },
          )}
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.preventDefault();
            handleAddToCart();
          }}
        >
          {isInCart ? `Added to cart` : 'Add to cart'}
        </button>
        <button
          className={classNames(
            styles.card__button,
            styles['card__button-favorites'],
            { [styles['card__button-cart--active']]: isInCart },
          )}
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.preventDefault();
            handleToggleFavorite();
          }}
        >
          {isFavorite ? (
            <Icon icon={icons.favorites_filled} />
          ) : (
            <Icon icon={icons.favorites} />
          )}
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
