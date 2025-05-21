import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../../types/Product';
import classNames from 'classnames';
import styles from './ProductCard.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { cartSlice } from '../../../../store/slices/cart';
import { favoritesSlice } from '../../../../store/slices/favorites';

interface Props {
  product: Product;
  withFullPrice?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  withFullPrice = false,
}) => {
  const dispatch = useAppDispatch();
  const cart: Product[] = useAppSelector(state => state.cart);
  const favorites: Product[] = useAppSelector(state => state.favorites);
  const isInCart = cart.find((item: Product) => item.id === product.id);
  const isFavorite = favorites.find((item: Product) => item.id === product.id);

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(cartSlice.actions.remove(product));

      return;
    }

    dispatch(cartSlice.actions.add(product));
  };

  const handleAddToFavourite = () => {
    if (isFavorite) {
      dispatch(favoritesSlice.actions.remove(product));

      return;
    }

    dispatch(favoritesSlice.actions.add(product));
  };

  return (
    <article className={styles.card}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.card__container}
      >
        <img
          src={product.image}
          alt={product.name}
          className={styles.card__image}
        />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.card__title}
      >
        {product.name}
      </Link>

      <h3 className={styles.card__price}>
        ${product.price}
        {withFullPrice && (
          <span className={styles.card__fullPrice}>${product.fullPrice}</span>
        )}
      </h3>

      <hr className="divider"></hr>

      <ul className={styles.card__description}>
        <li className={styles.card__info}>
          <span className={styles.card__field}>Screen</span>
          <span className={styles.card__value}>{product.screen}</span>
        </li>
        <li className={styles.card__info}>
          <span className={styles.card__field}>Capacity</span>
          <span className={styles.card__value}>{product.capacity}</span>
        </li>
        <li className={styles.card__info}>
          <span className={styles.card__field}>Ram</span>
          <span className={styles.card__value}>{product.ram}</span>
        </li>
      </ul>

      <div className={styles.card__actions}>
        <button
          className={classNames(styles.card__addCart, {
            [styles['card__addCart--active']]: isInCart,
          })}
          onClick={handleAddToCart}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </button>
        <div
          className={classNames(styles.card__addFavourite, {
            [styles['card__addFavourite--active']]: isFavorite,
          })}
          onClick={handleAddToFavourite}
        >
          {isFavorite ? (
            <img src="./icons/heart-filled.svg" alt="Favourite" />
          ) : (
            <img src="./icons/Favourites.png" alt="Favourite" />
          )}
        </div>
      </div>
    </article>
  );
};
