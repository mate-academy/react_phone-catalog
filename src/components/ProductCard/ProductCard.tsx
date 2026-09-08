import styles from './ProductCard.module.scss';
import favIconInactive from '../../assets/icons/heart-inactive.svg';
import favIconActive from '../../assets/icons/heart-active.svg';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';
import { useTranslation } from 'react-i18next';

interface SpecsType {
  screen: string;
  capacity: string;
  ram: string;
}

interface ProductCardProps {
  originalId: string;
  image: string;
  title: string;
  price: string;
  oldPrice?: string;
  specs: SpecsType;
  isFirst?: boolean;
  className?: string;
  onAddToCart?: () => void;
  isNew?: boolean;
  onClick?: () => void;
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
  isNew = false,
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
        price: Number(price.replace(/\$/g, '')) || 0,
        quantity: 1,
      });
    }
  };

  return (
    <Link
      to={`/phones/${originalId}`} // здесь снова жёстко "phones"
      className={`${styles.productCard} ${isFirst ? styles.firstCard : ''} ${className}`}
    >
      <div className={styles.productImageWrapper}>
        <img
          src={image || '/img/placeholder.png'}
          alt={title || 'No title'}
          className={styles.productImage}
        />
      </div>

      <div
        className={`${styles.titleWrapper} ${isFirst ? styles['titleWrapper--large'] : ''}`}
      >
        <h3 className={styles.productTitle}>{title || 'No title'}</h3>
      </div>

      <div className={styles.priceWrapper}>
        <span className={styles.productPrice}>{price || '$0'}</span>
        {oldPrice && !isNew && (
          <span className={styles.oldPrice}>{oldPrice}</span>
        )}
      </div>

      <div className={styles.divider}></div>

      <ul className={styles.specList}>
        <li className={styles.specItem}>
          <div className={styles.specLeft}>Screen</div>
          <div className={styles.specRight}>{specs.screen || '-'}</div>
        </li>
        <li className={styles.specItem}>
          <div className={styles.specLeft}>Capacity</div>
          <div className={styles.specRight}>{specs.capacity || '-'}</div>
        </li>
        <li className={styles.specItem}>
          <div className={styles.specLeft}>RAM</div>
          <div className={styles.specRight}>{specs.ram || '-'}</div>
        </li>
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
