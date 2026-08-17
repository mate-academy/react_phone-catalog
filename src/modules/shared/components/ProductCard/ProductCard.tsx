import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../types/Product';

import styles from './ProductCard.module.scss';
import favoriteIcon from '../../../../assets/images/Favourites.svg';
import favoritesFiledIcon from '../../../../assets/images/favoritesFiled.svg';
import { useFavorites } from '../../context/FavoriteContext';
import { useCart } from '../../context/CartContext';

interface Props {
  product: Product;
  isDiscounted?: boolean;
}

export const ProductCard = ({ product, isDiscounted }: Props) => {
  const {
    id,
    itemId,
    category,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;

  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCart, removeFromCart, isInCart } = useCart();

  const productId = itemId || id;
  const inCart = isInCart(productId);
  const favorite = isFavorite(productId);

  const handleClickCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inCart) {
      removeFromCart(productId);
    } else {
      addToCart(product);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (favorite) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(product);
    }
  };

  const handleClickLink = (e: React.MouseEvent) => {
    e.stopPropagation();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const productUrl = category
    ? `/${category}/${productId}`
    : `/products/${productId}`;

  return (
    <div className={styles.card}>
      <Link
        to={productUrl}
        className={styles.card__imageLink}
        onClick={e => handleClickLink(e)}
      >
        <figure className={styles.card__imageContainer}>
          <img src={image} alt={name} className={styles.card__image} />
        </figure>
      </Link>

      <Link
        to={productUrl}
        className={styles.card__title}
        onClick={e => handleClickLink(e)}
      >
        {name}
      </Link>

      <div className={styles.card__priceBlock}>
        <span className={styles.card__price}>
          ${isDiscounted ? price : fullPrice}
        </span>
        {isDiscounted && (
          <span className={styles.card__fullPrice}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.card__divider} />

      <div className={styles.card__specs}>
        <div className={styles.card__specRow}>
          <span>Screen</span>
          <span>{screen}</span>
        </div>
        <div className={styles.card__specRow}>
          <span>Capacity</span>
          <span>{capacity}</span>
        </div>
        <div className={styles.card__specRow}>
          <span>RAM</span>
          <span>{ram}</span>
        </div>
      </div>

      <div className={styles.card__buttons}>
        <button
          type="button"
          className={classNames(styles.card__btnCart, {
            [styles['card__btnCart--inCart']]: inCart,
          })}
          onClick={handleClickCart}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={classNames(styles.card__btnFavorite, {
            [styles['card__btnFavorite--active']]: favorite,
          })}
          aria-label="Add to favorites"
          onClick={handleFavoriteClick}
        >
          <img
            src={favorite ? favoritesFiledIcon : favoriteIcon}
            alt="favourite"
          />
        </button>
      </div>
    </div>
  );
};
