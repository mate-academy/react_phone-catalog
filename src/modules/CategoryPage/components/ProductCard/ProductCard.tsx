import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../shared/types';
import { useCart } from '../../../shared/context/CartContext';
import { useFavorites } from '../../../shared/context/FavoriteContext';
import { useTranslation } from 'react-i18next';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  hideDiscount?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  hideDiscount = false,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some(f => f.id === product.id);
  const hasDiscount =
    !hideDiscount &&
    product.priceDiscount &&
    product.priceDiscount < product.priceRegular;

  const isInCart = cart.some(item => item.product.id === product.id);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickedButton = (e.target as HTMLElement).closest('button');

    if (clickedButton && cardRef.current?.contains(clickedButton)) {
      return;
    }

    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const target = e.target as HTMLElement;

          if (!target.closest('button')) {
            navigate(`/product/${product.id}`);
          }
        }
      }}
    >
      <div className={styles.image}>
        <img
          src={`./${product.images?.[0] || '/img/product-not-found.png'}`}
          alt={product.name}
        />
      </div>

      <h3 className={styles.name}>{product.name}</h3>

      <div className={styles.price}>
        <span className={styles.current}>
          ${hasDiscount ? product.priceDiscount : product.priceRegular}
        </span>
        {hasDiscount && (
          <span className={styles.old}>${product.priceRegular}</span>
        )}
      </div>

      <div className={styles.specs}>
        {product.screen && (
          <div className={styles.spec}>
            <span className={styles.label}>Screen</span>
            <span className={styles.value}>{product.screen}</span>
          </div>
        )}
        {product.capacity && (
          <div className={styles.spec}>
            <span className={styles.label}>Capacity</span>
            <span className={styles.value}>{product.capacity}</span>
          </div>
        )}
        {product.ram && (
          <div className={styles.spec}>
            <span className={styles.label}>RAM</span>
            <span className={styles.value}>{product.ram}</span>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.addBtn} ${isInCart ? styles.added : ''}`}
          onClick={handleAddToCart}
        >
          {isInCart ? t('addedToCart') : t('addToCart')}
        </button>

        <button
          className={`${styles.favBtn} ${isFavorite ? styles.active : ''}`}
          onClick={e => {
            e.stopPropagation();
            toggleFavorite(product);
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};
