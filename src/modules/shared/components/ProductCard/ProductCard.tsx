import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  addToCart,
  CartItem,
  toggleFavourite,
  removeFromCart,
} from '../../../../features/cartAndFavoritesSlice';
import styles from './ProductCard.module.scss';
import { RootState } from '../../../../app/store';
import { Product } from '../../../../types/Product';

interface Props {
  product: Product;
  isBrandNew?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  isBrandNew = false,
}) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.shop.cart);
  const favourites = useAppSelector(
    (state: RootState) => state.shop.favourites,
  );

  const {
    itemId,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    image,
    category,
  } = product;

  const isInCart = cart.some((item: CartItem) => item.itemId === itemId);
  const isFavourite = favourites.some(
    (item: Product) => item.itemId === itemId,
  );

  return (
    <article className={styles.card}>
      <Link to={`/${category}/${itemId}`} className={styles.imageLink}>
        <img
          src={image.startsWith('/') ? image.slice(1) : image}
          alt={name}
          className={styles.image}
        />
      </Link>

      <Link to={`/${category}/${itemId}`} className={styles.titleLink}>
        <h3 className={styles.title}>{name}</h3>
      </Link>

      <div className={styles.priceWrapper}>
        {isBrandNew ? (
          <span className={styles.price}>${fullPrice}</span>
        ) : (
          <>
            <span className={styles.price}>${price}</span>
            <span className={styles.fullPrice}>${fullPrice}</span>
          </>
        )}
      </div>

      <div className={styles.divider}></div>

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

      <div className={styles.buttonsWrapper}>
        <button
          type="button"
          className={`${styles.addToCartButton} ${isInCart ? styles.added : ''}`}
          onClick={() => {
            if (!isInCart) {
              dispatch(addToCart(product));
            } else {
              dispatch(removeFromCart(itemId));
            }
          }}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <img
          src={`img/${isFavourite ? 'Added.svg' : 'Favourites.svg'}`}
          alt="Toggle favourite"
          className={`${styles.favouriteButton} ${isFavourite ? styles.isFavourite : ''}`}
          onClick={() => dispatch(toggleFavourite(product))}
        />
      </div>
    </article>
  );
};
