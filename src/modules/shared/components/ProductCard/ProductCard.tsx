import styles from './ProductCard.module.scss';
import classNames from 'classnames';
import { useFavourites } from '../../../../context/FavouritesContext';
import { Link } from 'react-router-dom';
import { Product, useCart } from '../../../../context/CartContext';
import { getNormalizedImagePath } from '../../getNormalizedImagePath';

interface Props {
  product: Product;
  isDiscountHidden?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  isDiscountHidden = false,
}) => {
  const {
    name: title,
    image,
    price,
    fullPrice,
    id,
    itemId,
    screen,
    capacity,
    ram,
  } = product;

  const { addToCart, removeFromCart, isInCart } = useCart();
  const { favourites, toggleFavourite, isFavourite } = useFavourites();

  const inCart = isInCart(String(id));

  const inFavourites = isFavourite
    ? isFavourite(id)
    : favourites.some(item => item.id === id);

  const imageSrc = getNormalizedImagePath(image);

  const handleCartClick = (event: React.MouseEvent) => {
    event.preventDefault();

    if (inCart) {
      removeFromCart(String(id));
    } else {
      addToCart(product);
    }
  };

  const handleFavouritesClick = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleFavourite(product);
  };

  return (
    <article className={styles.card}>
      <Link to={`/products/${itemId}`} className={styles.imageWrapper}>
        <img src={imageSrc} alt={title} className={styles.image} />
      </Link>

      <Link to={`/products/${itemId}`} className={styles.title}>
        {title}
      </Link>

      <div className={styles.priceBlock}>
        <span className={styles.price}>${price}</span>

        {!isDiscountHidden && fullPrice && fullPrice > price && (
          <span className={styles.fullPrice}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue}>{screen}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specValue}>{capacity}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specValue}>{ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={classNames(styles.addButton, {
            [styles['addButton--active']]: inCart,
          })}
          onClick={handleCartClick}
        >
          {inCart ? 'Added' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={classNames(styles.favouriteButton, {
            [styles['favouriteButton--active']]: inFavourites,
          })}
          onClick={handleFavouritesClick}
          aria-label={
            inFavourites ? 'Remove from favourites' : 'Add to favourites'
          }
        >
          <img
            src={getNormalizedImagePath(
              inFavourites
                ? 'img/icons/heart-active.svg'
                : 'img/icons/heart.svg',
            )}
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
};
