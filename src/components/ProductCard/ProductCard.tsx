import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './ProductCard.module.scss';
import { BaseProduct } from '../../types';
import { useAppContext } from '../../modules/hooks/use-context';

interface Props {
  product: BaseProduct;
}

export const ProductCard = ({ product }: Props) => {
  const {
    category,
    itemId,
    name,
    fullPrice,
    price,
    image,
    screen,
    capacity,
    ram,
  } = product;
  const { cartIds, addToCart, wishlistIds, toggleWishlist } = useAppContext();

  const isLiked = wishlistIds.includes(itemId);
  const isInCart = cartIds.includes(itemId);

  const addToCartHandler = (cartId: string) => {
    addToCart(cartId);
  };

  const addToWishlistHandler = (wishlistId: string) => {
    toggleWishlist(wishlistId);
  };

  return (
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
            onClick={() => {
              addToCartHandler(itemId);
            }}
          >
            {isInCart ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            type="button"
            className={cn(styles.wishlist, {
              [styles.wishlistActive]: isLiked,
            })}
            aria-label={
              isLiked ? 'Remove from favourites' : 'Add to favourites'
            }
            onClick={() => {
              addToWishlistHandler(itemId);
            }}
          >
            <i className={cn(isLiked ? 'fas' : 'far', 'fa-heart')} />
          </button>
        </div>
      </div>
    </article>
  );
};
