/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './ProductCard.module.scss';
import { Product } from '../../../shared/types';
import { useCart } from '../../../shared/context/CartContext';
import { useFavorites } from '../../../shared/context/FavoriteContext';
import { Button } from '../../../../components/UI/Button/Button';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some(fav => fav.id === product.id);
  const [imageError, setImageError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const imageSrc =
    imageError || !product.images?.[0]
      ? '/img/page-not-found.png'
      : `/${product.images[0]}`;

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
  };

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`}>
        <img
          src={imageSrc}
          alt={product.name || 'Product image'}
          className={styles.image}
          onError={() => setImageError(true)}
          loading="lazy"
        />
      </Link>
      <h3>
        <Link to={`/product/${product.id}`} className={styles.title}>
          {product.name}
        </Link>
      </h3>
      <div className={styles.price}>
        <span className={styles.current}>
          ${product.priceDiscount ?? product.priceRegular}
        </span>
        {product.priceDiscount &&
          product.priceDiscount < product.priceRegular && (
            <span className={styles.full}>${product.priceRegular}</span>
          )}
      </div>
      <div className={styles.divider}></div>
      <div className={styles.specs}>
        <p>Screen: {product.screen || 'N/A'}</p>
        <p>Capacity: {product.capacity || 'N/A'}</p>
        <p>RAM: {product.ram || 'N/A'}</p>
      </div>
      <div className={styles.actions}>
        <Button
          variant="primary"
          size="md"
          onClick={() => handleAddToCart()}
          disabled={isAdded}
        >
          {isAdded ? t('addedToCart') : t('addToCart')}
        </Button>
        <Button
          variant="secondary"
          size="md"
          onClick={() => toggleFavorite(product)}
          className={isFavorite ? styles.favoriteActive : ''}
        >
          {isFavorite ? '❤️' : '🤍'}
        </Button>
      </div>
    </div>
  );
};
