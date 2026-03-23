import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './ProductCard.module.scss';

const IconHeart = ({ filled }: { filled: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 14s-6-3.84-6-8a4 4 0 0 1 6-3.46A4 4 0 0 1 14 6c0 4.16-6 8-6 8Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill={filled ? 'currentColor' : 'none'}
    />
  </svg>
);

interface Props {
  product: Product;
  showDiscount?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  showDiscount = true,
}) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const inCart = isInCart(product.id);
  const fav = isFavorite(product.id);

  const detailPath = `/${product.category}/${product.itemId}`;
  const hasDiscount = product.fullPrice > product.price;

  const handleCartClick = () => {
    if (inCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.imgClip}>
        <Link to={detailPath} className={styles.imgWrap}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.img}
            loading="lazy"
          />
        </Link>
      </div>

      <div className={styles.body}>
        <Link to={detailPath} className={styles.name}>
          {product.name}
        </Link>

        <div className={styles.prices}>
          <span className={styles.price}>${product.price}</span>
          {showDiscount && hasDiscount && (
            <span className={styles.fullPrice}>${product.fullPrice}</span>
          )}
        </div>

        <div className={styles.divider} />

        <dl className={styles.specs}>
          {[
            ['Screen', product.screen],
            ['Capacity', product.capacity],
            ['RAM', product.ram],
          ].map(([label, value]) => (
            <div key={label} className={styles.specRow}>
              <dt className={styles.specLabel}>{label}</dt>
              <dd className={styles.specValue}>{value}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.actions}>
          <button
            className={`${styles.addBtn} ${inCart ? styles.addBtnAdded : ''}`}
            onClick={handleCartClick}
          >
            {inCart ? 'Added to cart' : 'Add to cart'}
          </button>

          <button
            className={`${styles.favBtn} ${fav ? styles.favBtnActive : ''}`}
            onClick={() => toggleFavorite(product)}
            aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
          >
            <IconHeart filled={fav} />
          </button>
        </div>
      </div>
    </article>
  );
};
