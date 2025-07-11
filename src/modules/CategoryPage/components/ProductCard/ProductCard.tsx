import React from 'react';
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

  const imageSrc = product.images?.[0] || '/images/placeholder.jpg';

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`}>
        <img
          src={imageSrc}
          alt={product.name || 'Product image'}
          className={styles.image}
          onError={e => {
            const imgElement = e.currentTarget;

            imgElement.src = '/images/placeholder.jpg';
          }}
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
      <div className={styles.actions}>
        <Button variant="primary" size="md" onClick={() => addToCart(product)}>
          {t('addToCart')}
        </Button>
        <Button
          variant="secondary"
          size="md"
          onClick={() => toggleFavorite(product)}
          className={`${styles.favorite} ${isFavorite ? styles.active : ''}`}
          aria-label={isFavorite ? t('removeFromFavorite') : t('addFavorite')}
        >
          ❤️
        </Button>
      </div>
    </div>
  );
};
