import React from 'react';
import { useFavorite } from '../../../../contexts/FavoritesContext';
import { Product } from '../../../../types/product';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { useCart } from '../../../../contexts/CartContext';
import { useTranslation } from 'react-i18next';

type Props = {
  product: Product;
  fullPriceOnly?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  fullPriceOnly = false,
}) => {
  const { addToCart, removeFromCart, cart } = useCart();
  const isInCart = cart.some(item => item.product.id === product.id);

  const { t } = useTranslation();

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const { addToFavorite, removeFromFavorite, favorite } = useFavorite();
  const isInFavorite = favorite.some(item => item.product.id === product.id);

  const handleFavoriteClick = () => {
    if (isInFavorite) {
      removeFromFavorite(product.id);
    } else {
      addToFavorite(product);
    }
  };

  if (!product) {
    return null;
  }

  const hasDiscount = Boolean(
    product.price && product.price < (product.fullPrice ?? 0),
  );

  const displayPrice = fullPriceOnly
    ? (product.fullPrice ?? 0)
    : product.price || product.fullPrice || 0;

  const displayDiscountPrice = !fullPriceOnly && hasDiscount;

  const safeProductImage = (product.image ?? '').startsWith('/')
    ? product.image
    : `/${product.image}`;

  return (
    <article className={styles.card}>
      <Link to={`/${product.category}/product/${product.itemId || product.id}`}>
        <img src={safeProductImage} alt={product.name} className={styles.img} />
      </Link>
      <p className={styles.title}>{product.name}</p>

      <div className={styles.priceContainer}>
        <h3 className={styles.price}>${displayPrice}</h3>

        {displayDiscountPrice && (
          <h4 className={styles.discount}>${product.fullPrice}</h4>
        )}
      </div>

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <p className={styles.specTitle}>{t('productCard.specs.screen')}</p>
          <span className={styles.description}>{product.screen}</span>
        </div>
        <div className={styles.specRow}>
          <p className={styles.specTitle}>{t('productCard.specs.capacity')}</p>
          <span className={styles.description}>{product.capacity}</span>
        </div>
        <div className={styles.specRow}>
          <p className={styles.specTitle}>{t('productCard.specs.ram')}</p>
          <span className={styles.description}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          className={`${styles.addToCart} ${isInCart ? styles.isActive : ''}`}
          aria-label={t('productCard.buttons.toggleCart')}
          onClick={handleCartClick}
        >
          {isInCart
            ? t('productCard.buttons.added')
            : t('productCard.buttons.addToCart')}
        </button>
        <div>
          <button
            type="button"
            className={styles.iconLink}
            aria-label={t('productCard.buttons.toggleFavorites')}
            onClick={handleFavoriteClick}
          >
            <img
              src={
                isInFavorite
                  ? '/img/icons/favorites-field.svg'
                  : '/img/icons/favorites.svg'
              }
              alt=""
            />
          </button>
        </div>
      </div>
    </article>
  );
};
