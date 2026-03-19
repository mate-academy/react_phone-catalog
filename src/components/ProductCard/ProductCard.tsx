import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { useStore } from '../../context';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { cart, addToCart, favorites, addToFavorites } = useStore();

  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    itemId,
    category,
  } = product;

  const isAddedToCart = cart.some(item => item.id === itemId);
  const isFavorite = favorites.some(item => item.itemId === itemId);

  return (
    <div className={styles.card}>
      <Link to={`/${category}/${itemId}`} className={styles.imageWrapper}>
        <img src={`${image}`} alt={name} className={styles.image} />
      </Link>

      <Link to={`/${category}/${itemId}`} className={styles.title}>
        {name}
      </Link>

      <div className={styles.priceBox}>
        <span className={styles.price}>${price}</span>
        {fullPrice !== price && (
          <span className={styles.fullPrice}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.divider}></div>

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specName}>Screen</span>
          <span className={styles.specValue}>{screen}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specName}>Capacity</span>
          <span className={styles.specValue}>{capacity}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specName}>RAM</span>
          <span className={styles.specValue}>{ram}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          className={classNames(styles.addToCart, {
            [styles.isAdded]: isAddedToCart,
          })}
          onClick={() => addToCart(product)}
        >
          {isAddedToCart ? 'Added' : 'Add to cart'}
        </button>

        <button
          className={classNames(styles.favoriteBtn, {
            [styles.isFavorite]: isFavorite,
          })}
          onClick={() => addToFavorites(product)}
        >
          <img
            src={
              isFavorite
                ? 'img/icons/Favourites Filled (Heart Like).svg'
                : 'img/icons/Favourites (Heart Like).svg'
            }
            alt="Favorite"
          />
        </button>
      </div>
    </div>
  );
};
