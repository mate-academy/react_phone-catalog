import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ProductCard.module.scss';

import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { getAssetUrl } from '../../utils/helpers';
import { useLanguage } from '../../context/LanguageContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t } = useLanguage();

  const { itemId, name, fullPrice, price, screen, capacity, ram, image } =
    product;

  const inCart = isInCart(itemId);
  const favorited = isFavorite(product.id);

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!inCart) {
      addToCart(product);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <div className={styles.card} data-testid="product-card">
      <Link to={`/product/${itemId}`} className={styles.imageLink}>
        <img src={getAssetUrl(image)} alt={name} loading="lazy" />
      </Link>

      <Link to={`/product/${itemId}`} className={styles.titleLink}>
        {name}
      </Link>

      <div className={styles.priceContainer}>
        <span className={styles.priceDiscount}>${price}</span>
        {price !== fullPrice && (
          <span className={styles.priceRegular}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>{t('productCard.screen')}</span>
          <span className={styles.specVal}>{screen}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>{t('productCard.capacity')}</span>
          <span className={styles.specVal}>{capacity}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>{t('productCard.ram')}</span>
          <span className={styles.specVal}>{ram}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          type="button"
          onClick={handleCartClick}
          className={`${styles.btnCart} ${inCart ? styles.btnCartActive : ''}`}
          aria-label={
            inCart ? t('productCard.addedToCart') : t('productCard.addToCart')
          }
        >
          {inCart ? t('productCard.addedToCart') : t('productCard.addToCart')}
        </button>

        <button
          type="button"
          onClick={handleFavoriteClick}
          className={`${styles.btnFavorite} ${favorited ? styles.btnFavoriteActive : ''}`}
          aria-label={
            favorited
              ? t('productCard.removeFromFavorites')
              : t('productCard.addToFavorites')
          }
        >
          <i
            className={favorited ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
          />
        </button>
      </div>
    </div>
  );
};
