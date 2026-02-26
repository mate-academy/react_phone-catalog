import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './ProductCard.module.scss';
import { BaseProduct } from '../../types';
import { useAppContext } from '../../hooks/use-context';
import { WishlistButton } from '../WishlistButton';
import { mediaPath } from '../../utils/PathImg';

interface Props {
  variant?: string;
  product: BaseProduct;
}

export const ProductCard = ({ variant = '', product }: Props) => {
  const {
    category,
    itemId,
    name,
    fullPrice,
    price,
    image,
    screen,
    color,
    capacity,
    ram,
  } = product;
  const { cartIds, addToCart, deleteFromCart, wishlistIds, toggleWishlist } =
    useAppContext();

  const isLiked = wishlistIds.includes(itemId);
  const isInCart = cartIds.includes(itemId);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCartHandler = () => {
    addToCart({
      id: itemId,
      color: color,
      capacity: capacity,
    });
  };

  const removeToCartHandler = () => {
    return deleteFromCart({
      id: itemId,
      color: color,
      capacity: capacity,
    });
  };

  return (
    <article className={`${variant ? styles.variant : ''} ${styles.card}`}>
      <Link
        to={`/${category}/${itemId}`}
        className={styles.imageLink}
        onClick={handleBackToTop}
      >
        {image ? (
          <img src={mediaPath(image)} alt={name} className={styles.image} />
        ) : (
          <img
            className="not-scale"
            src="img/product-not-found.png"
            alt="Product not found"
          />
        )}
      </Link>

      <div className={styles.body}>
        <Link
          to={`/${category}/${itemId}`}
          className={styles.nameLink}
          onClick={handleBackToTop}
        >
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
          {isInCart ? (
            <button
              type="button"
              className={cn(styles.addToCart, {
                [styles.addedToCart]: isInCart,
              })}
              onClick={removeToCartHandler}
            >
              Added to cart
            </button>
          ) : (
            <button
              type="button"
              className={cn(styles.addToCart)}
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          )}

          <WishlistButton
            productId={itemId}
            isLiked={isLiked}
            toggleWishlist={toggleWishlist}
          />
        </div>
      </div>
    </article>
  );
};
