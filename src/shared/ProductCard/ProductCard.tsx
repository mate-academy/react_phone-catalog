import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { RootState } from '../../app/store/store';
import { handleAddToCart } from '../../services/addToCart';
import { handleAddToFavourites } from '../../services/addToFavourites';
import styles from './ProductCard.module.scss';

export type Props = {
  category: string;
  itemId: string;
  id: string | number;
  image: string;
  name: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
  onClick?: () => void;
  isNew?: boolean;
  className?: string;
};

export const ProductCard: React.FC<Props> = ({
  category,
  itemId,
  id,
  image,
  name,
  price,
  fullPrice,
  screen,
  capacity,
  ram,
  onClick,
  isNew,
  className,
}) => {
  const dispatch = useDispatch();
  const favoritesProducts = useSelector(
    (state: RootState) => state.favourites.items,
  );
  const cartProducts = useSelector((state: RootState) => state.cart.items);

  const isInCart = useMemo(
    () => cartProducts.some(p => p.itemId === itemId),
    [cartProducts, itemId],
  );

  const isFavorite = useMemo(
    () => favoritesProducts.some(p => p.itemId === itemId),
    [favoritesProducts, itemId],
  );

  const handleFavoriteClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      handleAddToFavourites(
        id,
        itemId,
        image,
        name,
        price,
        fullPrice,
        screen,
        capacity,
        ram,
        category,
        favoritesProducts,
        dispatch,
      );
    },
    [
      id,
      itemId,
      image,
      name,
      price,
      fullPrice,
      screen,
      capacity,
      ram,
      category,
      favoritesProducts,
      dispatch,
    ],
  );

  const handleCartClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();

      if (isInCart) {
        return;
      }

      handleAddToCart(
        id,
        itemId,
        image,
        name,
        price,
        category,
        1,
        cartProducts,
        dispatch,
      );
    },
    [
      id,
      itemId,
      image,
      name,
      price,
      category,
      cartProducts,
      dispatch,
      isInCart,
    ],
  );

  const handleProductLinkClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.stopPropagation();
      onClick?.();
    },
    [onClick],
  );

  return (
    <div className={classNames(styles.phones_card, className)}>
      <Link
        to={`/product/${itemId}`}
        className={styles.phones_link}
        onClick={handleProductLinkClick}
      >
        <img src={image} alt={name} className={styles.phones_img} />
      </Link>
      <Link
        to={`/product/${itemId}`}
        className={styles.phones_title}
        onClick={handleProductLinkClick}
      >
        {name}
      </Link>
      <div className={`${styles.phones_priceBlock} flex`}>
        <p className={styles.phones_priceFull}>${price}</p>
        {isNew && <p className={styles.phones_priceHot}>${fullPrice}</p>}
      </div>
      <div className={styles.phones_options}>
        <p className={styles.phones_option}>
          Screen{' '}
          <span className={styles.phones_details}>
            {screen.split(' ').slice(0, 2).join(' ')}
          </span>
        </p>
        <p className={styles.phones_option}>
          Capacity <span className={styles.phones_details}>{capacity}</span>
        </p>
        <p className={styles.phones_option}>
          RAM <span className={styles.phones_details}>{ram}</span>
        </p>
      </div>
      <div className={styles.phones_buttonsContainer}>
        <button
          type="button"
          className={classNames(styles.phones_buttonAdd, {
            [styles.added]: isInCart,
          })}
          onClick={handleCartClick}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          className={styles.phones_favourites}
          onClick={handleFavoriteClick}
        >
          <span
            className={classNames(
              isFavorite
                ? styles.phones_favourites_heartIconFull
                : styles.phones_favourites_heartIcon,
            )}
          ></span>
        </button>
      </div>
    </div>
  );
};
