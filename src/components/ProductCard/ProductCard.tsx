import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './ProductCard.module.scss';
import { Phone } from '../../types/Phone';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';

interface Props {
  phone: Phone;
  showRegularPriceOnly?: boolean;
}

export const ProductCard = ({ phone, showRegularPriceOnly = false }: Props) => {
  const { t } = useTranslation();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { cartItems, addToCart } = useCart();
  const {
    id,
    name,
    priceRegular,
    priceDiscount,
    screen,
    capacity,
    ram,
    images,
  } = phone;

  const isFavorite = favorites.find(fav => fav.id === phone.id);
  const isInCart = cartItems.some(item => item.phone.id === phone.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(phone);
    } else {
      addToFavorites(phone);
    }
  };

  const handleAddToCartClick = () => {
    if (!isInCart) {
      addToCart(phone);
    }
  };

  const imageUrl = `/${images[0]}`;
  const screenDisplay = screen.replace('(Super Retina XDR)', '').trim();
  const showFullPrice =
    !showRegularPriceOnly &&
    priceDiscount !== 0 &&
    priceDiscount !== priceRegular;

  return (
    <article className={styles.card}>
      <Link to={`/product/${id}`} className={styles.imageContainer}>
        <img src={imageUrl} alt={name} className={styles.image} />
      </Link>

      <Link to={`/product/${id}`} className={styles.titleLink}>
        <h3 className={styles.title}>{name}</h3>
      </Link>

      <div className={styles.price}>
        <span>
          ${showRegularPriceOnly ? priceRegular : priceDiscount || priceRegular}
        </span>
        {showFullPrice && (
          <span className={styles.fullPrice}>${priceRegular}</span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specName}>{t('product.specs.screen')}</span>
          <span className={styles.specValue}>{screenDisplay}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specName}>{t('product.specs.capacity')}</span>
          <span className={styles.specValue}>{capacity}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specName}>{t('product.specs.ram')}</span>
          <span className={styles.specValue}>{ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={classNames(styles.addToCart, {
            [styles.addedToCart]: isInCart,
          })}
          onClick={handleAddToCartClick}
          disabled={isInCart}
        >
          {isInCart ? t('common.addedToCart') : t('common.addToCart')}
        </button>
        <button
          type="button"
          className={styles.favorite}
          onClick={handleFavoriteClick}
        >
          <img
            src={isFavorite ? '/img/heart_active.svg' : '/img/heart.svg'}
            alt={t('icons.heartAlt')}
          />
        </button>
      </div>
    </article>
  );
};
