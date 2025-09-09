import styles from './ProductCard.module.scss';
import favIconInactive from '../../assets/icons/heart-inactive.svg';
import favIconActive from '../../assets/icons/heart-active.svg';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';
import { useTranslation } from 'react-i18next';

interface Spec {
  left: string;
  right: string;
}

interface ProductCardProps {
  originalId: number;
  image: string;
  title: string;
  price: string;
  oldPrice?: string;
  specs: Spec[];
  isFirst?: boolean;
  className?: string;
  onAddToCart?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  originalId,
  image,
  title,
  price,
  oldPrice,
  specs,
  isFirst = false,
  className = '',
  onAddToCart,
}) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { cartItems, addToCart } = useCart();
  const { t } = useTranslation();

  const isInCart = cartItems.some(item => item.id === originalId);
  const isFavorite = favorites.includes(originalId);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart();
    } else if (!isInCart) {
      addToCart({
        id: originalId,
        title,
        image,
        price: Number(price.replace(/\$/g, '')),
        quantity: 1,
      });
    }
  };

  return (
    <Link
      to={`/phones/${originalId}`}
      className={`${styles.productCard} ${isFirst ? styles.firstCard : ''} ${className}`}
    >
      <div className={styles.productImageWrapper}>
        <img src={image} alt={title} className={styles.productImage} />
      </div>

      <div
        className={`${styles.titleWrapper} ${isFirst ? styles['titleWrapper--large'] : ''}`}
      >
        <h3 className={styles.productTitle}>{title}</h3>
      </div>

      <div className={styles.priceWrapper}>
        <span className={styles.productPrice}>{price}</span>
        {oldPrice && <span className={styles.oldPrice}>{oldPrice}</span>}
      </div>

      <div className={styles.divider}></div>

      <ul className={styles.specList}>
        {specs.map(({ left, right }, i) => {
          const key = left.charAt(0).toLowerCase() + left.slice(1);
          const translated = t(`specs.${key}`) || left;
          const displayLeft =
            key === 'ram'
              ? translated.toUpperCase()
              : translated.charAt(0).toUpperCase() + translated.slice(1);

          return (
            <li key={i} className={styles.specItem}>
              <div className={styles.specLeft}>{displayLeft}</div>
              <div className={styles.specRight}>{right}</div>
            </li>
          );
        })}
      </ul>

      <div className={styles.productActions}>
        <button
          className={styles.buyButton}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart();
          }}
          disabled={isInCart}
        >
          {isInCart ? t('product.addedToCart') : t('product.addToCart')}
        </button>

        <button
          className={`${styles.favButton} ${isFavorite ? styles.active : ''}`}
          aria-label={t('product.toggleFavorite')}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(originalId);
          }}
        >
          <img
            src={isFavorite ? favIconActive : favIconInactive}
            alt={t('product.favorite')}
            className={styles.favIcon}
          />
        </button>
      </div>
    </Link>
  );
};
