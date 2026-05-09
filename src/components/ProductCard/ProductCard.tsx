import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { buildImageUrl } from '../../api/api';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useT } from '../../context/LanguageContext';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
  showDiscount?: boolean;
}

export const ProductCard = ({ product, showDiscount = true }: Props) => {
  const { isInCart, add } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const t = useT();
  const inCart = isInCart(product.id);
  const fav = isFavorite(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!inCart) {
      add(product);
    }
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product);
  };

  return (
    <Link to={`/product/${product.itemId}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          src={buildImageUrl(product.image)}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
      </div>

      <h3 className={styles.title}>{product.name}</h3>

      <div className={styles.price}>
        <span className={styles.priceCurrent}>${product.price}</span>
        {showDiscount && product.fullPrice > product.price && (
          <span className={styles.priceOld}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      <ul className={styles.specs}>
        <li>
          <span>{t('product.screen')}</span>
          <span>{product.screen}</span>
        </li>
        <li>
          <span>{t('product.capacity')}</span>
          <span>{product.capacity}</span>
        </li>
        <li>
          <span>{t('product.ram')}</span>
          <span>{product.ram}</span>
        </li>
      </ul>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={handleAdd}
          className={classNames(styles.addBtn, {
            [styles.addBtnAdded]: inCart,
          })}
        >
          {inCart ? t('product.addedToCart') : t('product.addToCart')}
        </button>

        <button
          type="button"
          onClick={handleFav}
          className={classNames(styles.favBtn, {
            [styles.favBtnActive]: fav,
          })}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
            <path
              d="M8 14s-5-3-5-8a3 3 0 0 1 5-2 3 3 0 0 1 5 2c0 5-5 8-5 8z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill={fav ? 'currentColor' : 'none'}
            />
          </svg>
        </button>
      </div>
    </Link>
  );
};
