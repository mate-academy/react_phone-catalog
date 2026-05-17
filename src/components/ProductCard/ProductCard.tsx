import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/types';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { useTranslation } from 'react-i18next';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
  hasDiscount?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  hasDiscount = true,
}) => {
  const { t } = useTranslation();

  const {
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
    category,
  } = product;

  const { favorites, toggleFavorite } = useFavorites();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const isFavorite = favorites.some(item => item.itemId === itemId);
  const isInCart = cartItems.some(
    item => String(item.itemId) === String(itemId),
  );

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(itemId);
    } else {
      addToCart(product);
    }
  };

  return (
    <article className={styles.card}>
      <Link
        to={`/${category}/${itemId}`}
        className={styles['card__image-container']}
      >
        <img src={image} alt={name} className={styles.card__image} />
      </Link>

      <div className={styles.card__content}>
        <h2 className={styles.card__title}>
          <Link to={`/${category}/${itemId}`} className={styles.card__link}>
            {name}
          </Link>
        </h2>

        <div className={styles.card__price}>
          <span className={styles['card__price--current']}>${price}</span>
          {hasDiscount && fullPrice !== price && (
            <span className={styles['card__price--old']}>${fullPrice}</span>
          )}
        </div>

        <div className={styles.card__divider} />

        <div className={styles.card__specs}>
          <div className={styles.card__spec}>
            <span className={styles['card__spec-label']}>
              {t('product.screen')}
            </span>
            <span className={styles['card__spec-value']}>{screen}</span>
          </div>
          <div className={styles.card__spec}>
            <span className={styles['card__spec-label']}>
              {t('product.built_in_memory')}
            </span>
            <span className={styles['card__spec-value']}>{capacity}</span>
          </div>
          <div className={styles.card__spec}>
            <span className={styles['card__spec-label']}>
              {t('product.ram')}
            </span>
            <span className={styles['card__spec-value']}>{ram}</span>
          </div>
        </div>
      </div>

      <div className={styles.card__buttons}>
        <button
          type="button"
          className={`${styles['card__btn-add']} ${isInCart ? styles['card__btn-add--active'] : ''}`}
          onClick={handleCartClick}
        >
          {isInCart ? t('product.added') : t('product.add_to_cart')}
        </button>

        <button
          type="button"
          className={`${styles['card__icon-heart']} ${isFavorite ? styles['card__icon-heart--active'] : ''}`}
          onClick={() => toggleFavorite(product)}
          aria-label="Add to favorite"
        />
      </div>
    </article>
  );
};
