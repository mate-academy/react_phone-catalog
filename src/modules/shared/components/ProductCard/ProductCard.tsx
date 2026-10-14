import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useLanguage } from '../../context/LanguageContext';
import { getPublicPath } from '../../utils/pathHelper';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
  hasDiscount?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  hasDiscount = true,
}) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t } = useLanguage();

  const inCart = isInCart(product.itemId);
  const favorite = isFavorite(product.itemId);
  const productUrl = `/product/${product.itemId}`;

  return (
    <div className={styles.card} data-cy="cardsContainer">
      <Link to={productUrl} className={styles.imageWrapper}>
        <img
          src={getPublicPath(product.image)}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link to={productUrl} className={styles.title}>
        {product.name}
      </Link>

      <div className={styles.priceContainer}>
        <span className={styles.price}>
          ${hasDiscount ? product.price : product.fullPrice}
        </span>
        {hasDiscount && product.fullPrice > product.price && (
          <span className={styles.fullPrice}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specsList}>
        <div className={styles.specItem}>
          <span className={styles.specName}>{t('screen')}</span>
          <span className={styles.specValue}>{product.screen}</span>
        </div>
        <div className={styles.specItem}>
          <span className={styles.specName}>{t('capacity')}</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </div>
        <div className={styles.specItem}>
          <span className={styles.specName}>{t('ram')}</span>
          <span className={styles.specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => addToCart(product)}
          className={classNames(styles.cartButton, {
            [styles.added]: inCart,
          })}
          disabled={inCart}
          data-cy="addToCartButton"
        >
          {inCart ? t('addedToCart') : t('addToCart')}
        </button>

        <button
          type="button"
          onClick={() => toggleFavorite(product)}
          className={classNames(styles.favoriteButton, {
            [styles.active]: favorite,
          })}
          aria-label="Add to favorites"
          data-cy="addToFavoriteButton"
        >
          <i className={favorite ? 'fas fa-heart' : 'far fa-heart'} />
        </button>
      </div>
    </div>
  );
};
