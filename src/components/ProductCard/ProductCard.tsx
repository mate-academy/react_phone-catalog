import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './ProductCard.module.scss';

interface Props {
  id: number;
  category: string;
  itemId: string;
  image: string;
  name: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
  isLiked?: boolean;
  isInCart?: boolean;
}

export const ProductCard = ({
  category,
  itemId,
  image,
  name,
  price,
  fullPrice,
  screen,
  capacity,
  ram,
  isLiked = false,
  isInCart = false,
}: Props) => (
  <article className={styles.card}>
    <Link to={`/${category}/${itemId}`} className={styles.imageLink}>
      <img src={image} alt={name} className={styles.image} />
    </Link>

    <div className={styles.body}>
      <Link to={`/${category}/${itemId}`} className={styles.nameLink}>
        <p className={styles.name}>{name}</p>
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>${price}</span>
        {fullPrice !== price && (
          <span className={styles.fullPrice}>${fullPrice}</span>
        )}
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

      <div className={styles.actions}>
        <button
          type="button"
          className={cn(styles.addToCart, {
            [styles.addedToCart]: isInCart,
          })}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          className={cn(styles.wishlist, {
            [styles.wishlistActive]: isLiked,
          })}
          aria-label={isLiked ? 'Remove from favourites' : 'Add to favourites'}
        >
          <i className={cn(isLiked ? 'fas' : 'far', 'fa-heart')} />
        </button>
      </div>
    </div>
  </article>
);
