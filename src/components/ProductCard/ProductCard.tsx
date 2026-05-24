/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  hasDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  hasDiscount: hasDiscountProp,
}) => {
  const { itemId, name, fullPrice, price, screen, capacity, ram } = product;
  const hasDiscount = hasDiscountProp ?? fullPrice > price;
  const displayedPrice = hasDiscount ? price : fullPrice;

  const { toggleCartItem, addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const inCart = isInCart(product.id);
  const favorited = isFavorite(product.id);

  const handleAddToCart = () => {
    toggleCartItem(product);
  };

  // const handleAddToCart = () => {
  //   addToCart(product);
  // };

  const handleToggleFav = () => {
    toggleFavorite(product);
  };

  return (
    <article className={styles.card} data-cy="cardsContainer">
      <Link to={`/product/${itemId}`} className={styles.card__imageLink}>
        <img src={product.image} alt={name} className={styles.card__image} />
      </Link>

      <Link to={`/product/${itemId}`} className={styles.card__title}>
        {name}
      </Link>

      <div className={styles.card__prices}>
        <span className={styles.card__price}>${displayedPrice}</span>
        {hasDiscount && (
          <span className={styles.card__fullPrice}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.card__divider} />

      <div className={styles.card__specs}>
        <div className={styles.card__spec}>
          <span className={styles.card__specName}>Screen</span>
          <span className={styles.card__specValue}>{screen}</span>
        </div>

        <div className={styles.card__spec}>
          <span className={styles.card__specName}>Capacity</span>
          <span className={styles.card__specValue}>{capacity}</span>
        </div>

        <div className={styles.card__spec}>
          <span className={styles.card__specName}>RAM</span>
          <span className={styles.card__specValue}>{ram}</span>
        </div>
      </div>

      <div className={styles.card__actions}>
        <button
          type="button"
          className={classNames(styles.card__addToCart, {
            [styles['card__addToCart--active']]: inCart,
          })}
          onClick={handleAddToCart}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={classNames(styles.card__favourite, {
            [styles['card__favourite--active']]: favorited,
          })}
          aria-label={
            favorited ? 'Remove from favourites' : 'Add to favourites'
          }
          onClick={handleToggleFav}
        >
          <img
            src={
              favorited
                ? 'img/icons/favourites-filled.svg'
                : 'img/icons/favourites.svg'
            }
            alt={favorited ? 'Remove from favourites' : 'Add to favourites'}
            data-no-invert={favorited || undefined}
          />
        </button>
      </div>
    </article>
  );
};
