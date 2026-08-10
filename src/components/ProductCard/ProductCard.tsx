import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { getPublicPath } from '../../utils/getPublicPath';

interface Props {
  product: Product;
  hideOldPrice?: boolean;
  variant?: 'default' | 'catalog';
}

export const ProductCard: React.FC<Props> = ({
  product,
  hideOldPrice,
  variant = 'default',
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart, isInCart } = useCart();
  const { t } = useLanguage();
  const { itemId, name, price, fullPrice, image, screen, capacity, ram } =
    product;
  const isProductFavorite = isFavorite(itemId);
  const isProductInCart = isInCart(itemId);

  return (
    <div
      className={`${styles.card} ${
        variant === 'catalog' ? styles.catalogCard : ''
      }`}
    >
      <Link
        to={`/product/${itemId}`}
        state={{ category: product.category }}
        className={styles.imageContainer}
      >
        <img src={getPublicPath(image)} alt={name} />
      </Link>

      <Link
        to={`/product/${itemId}`}
        state={{ category: product.category }}
        className={styles.title}
      >
        {name}
      </Link>

      <div className={styles.priceContainer}>
        <span className={styles.price}>${price}</span>
        {fullPrice && fullPrice > price && !hideOldPrice && (
          <span className={styles.fullPrice}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specName}>{t('product.screen')}</span>
          <span className={styles.specValue}>{screen}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specName}>{t('product.capacity')}</span>
          <span className={styles.specValue}>{capacity}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specName}>{t('product.ramShort')}</span>
          <span className={styles.specValue}>{ram}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.addToCart} ${
            isProductInCart ? styles.addToCartSelected : ''
          }`}
          aria-pressed={isProductInCart}
          onClick={() => addToCart(product)}
        >
          {t(isProductInCart ? 'product.addedToCart' : 'product.addToCart')}
        </button>
        <button
          type="button"
          className={`${styles.favorite} ${
            isProductFavorite ? styles.favoriteSelected : ''
          }`}
          aria-label={t(
            isProductFavorite
              ? 'product.removeFavorite'
              : 'product.addFavorite',
            { name },
          )}
          aria-pressed={isProductFavorite}
          onClick={() => toggleFavorite(itemId)}
        >
          <img
            src={getPublicPath(
              isProductFavorite ? 'img/heart-filled.svg' : 'img/heart.svg',
            )}
            alt=""
            aria-hidden="true"
            className={styles.favoriteIcon}
          />
        </button>
      </div>
    </div>
  );
};
