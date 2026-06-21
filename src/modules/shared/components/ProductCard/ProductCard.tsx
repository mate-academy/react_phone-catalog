import { Link } from 'react-router-dom';
import { Product } from '../../../../types';
import { useProducts, useCart } from '../../../../context';
import { getImageUrl } from '../../../../utils';
import { ICONS } from '../../../../constants';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
  showDiscount?: boolean;
}

export const ProductCard = ({ product, showDiscount = true }: Props) => {
  const {
    name,
    price,
    fullPrice,
    image,
    screen,
    capacity,
    ram,
    category,
    itemId,
  } = product;
  const hasDiscount = showDiscount && price !== fullPrice;
  const { isFavorite, toggleFavorite } = useProducts();
  const isInFavorites = isFavorite(product.id);
  const { isInCart, addToCart } = useCart();
  const inCart = isInCart(product.id);

  return (
    <article className={styles.card}>
      <Link to={`/${category}/${itemId}`} className={styles.linkContainer}>
        <div className={styles.imageWrapper}>
          <img src={getImageUrl(image)} alt={name} className={styles.image} />
        </div>
        <p className={styles.name}>{name}</p>
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>${price}</span>
        {hasDiscount && <span className={styles.fullPrice}>${fullPrice}</span>}
      </div>

      <hr className={styles.divider} />

      <ul className={styles.specs}>
        <li className={styles.specRow}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue}>{screen}</span>
        </li>
        <li className={styles.specRow}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specValue}>{capacity}</span>
        </li>
        <li className={styles.specRow}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specValue}>{ram}</span>
        </li>
      </ul>

      <div className={styles.buttons}>
        <button
          className={`${styles.addToCart} ${inCart ? styles.addToCartActive : ''}`}
          onClick={() => addToCart(product)}
          disabled={inCart}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className={`${styles.favourites}${isInFavorites ? ` ${styles['favourites--active']}` : ''}`}
          aria-label={
            isInFavorites ? 'Remove from favourites' : 'Add to favourites'
          }
          onClick={() => toggleFavorite(product)}
        >
          <img
            src={isInFavorites ? ICONS.FAVOURITES_ACTIVE : ICONS.FAVOURITES}
            alt="Favourites"
          />
        </button>
      </div>
    </article>
  );
};
