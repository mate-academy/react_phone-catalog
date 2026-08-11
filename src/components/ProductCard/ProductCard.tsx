import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoriteContext';
import { ProductActions } from '../ProductActions';
import styles from './ProductCard.module.scss';

export interface Props {
  product: Product;
  showDiscount?: boolean;
}

export const ProductCard: React.FC<Props> = ({ product, showDiscount = true }) => {
  const { t } = useTranslation();
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const inCart = isInCart(product.id);
  const inFavorites = isFavorite(product.id);

  const handleAddToCart = () => {
    if (!inCart) {
      addToCart(product);
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
  };

  // Product link path and state (for navigation highlighting)
  const productLink = `/product/${product.itemId}`;
  const productLinkState = { category: product.category };

  // Determine if we should show the full price (crossed out)
  const hasDiscount = product.fullPrice > product.price;
  const shouldShowFullPrice = showDiscount && hasDiscount;

  return (
    <article className={styles.card}>
      <Link to={productLink} state={productLinkState} className={styles.imageLink}>
        <div className={styles.imageContainer}>
          <img src={product.image} alt={product.name} loading="lazy" className={styles.image} />
        </div>
      </Link>

      <div className={styles.content}>
        <Link to={productLink} state={productLinkState} className={styles.title}>
          {product.name}
        </Link>

        <div className={styles.prices}>
          <span className={styles.currentPrice}>${product.price}</span>
          {shouldShowFullPrice && <span className={styles.fullPrice}>${product.fullPrice}</span>}
        </div>

        <div className={styles.divider} />

        <div className={styles.specs}>
          <div className={styles.spec}>
            <span className={styles.specLabel}>{t('product.screen')}</span>
            <span className={styles.specValue}>{product.screen}</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>{t('product.capacity')}</span>
            <span className={styles.specValue}>{product.capacity}</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>{t('product.ram')}</span>
            <span className={styles.specValue}>{product.ram}</span>
          </div>
        </div>

        <ProductActions inCart={inCart} inFavorites={inFavorites} onAddToCart={handleAddToCart} onToggleFavorite={handleToggleFavorite} />
      </div>
    </article>
  );
};
