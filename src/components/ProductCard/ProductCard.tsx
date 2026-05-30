import React from 'react';
import styles from './ProductCard.module.scss';

import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorite } from '../../context/FavoritesContext';
type Props = {
  product: Product;
  discount: boolean;
};
export const ProductCard: React.FC<Props> = ({ product, discount }) => {
  const { addToCart, isInCart, toggleCart } = useCart();
  const { toggleFavorite, isInFavorites } = useFavorite();

  if (!product) {
    return null;
  }

  return (
    <div className={styles.card}>
      <div>
        <Link
          className={styles.card__productImg}
          to={`/${product.category}/${product.itemId}`}
        >
          <img src={product.image} alt={product.name} />
        </Link>
      </div>
      <p className={styles.card__name}>{product.name}</p>
      {!discount ? (
        <p className={styles.card__price}>${product.fullPrice}</p>
      ) : (
        <div className={styles.card__InfoPrice}>
          <p className={styles.card__price}>${product.price}</p>
          <p
            className={`${styles.card__price} ${styles['card__price--fullprice']}`}
          >
            ${product.fullPrice}
          </p>
        </div>
      )}
      <div className={styles.card__contain}>
        <div className={styles.card__contain__settings}>
          <p className={styles.card__contain__settings__title}>Screen</p>
          <p className={styles.card__contain__settings__text}>
            {' '}
            {product.screen}
          </p>
        </div>
        <div className={styles.card__contain__settings}>
          <p className={styles.card__contain__settings__title}>Capacity</p>
          <p className={styles.card__contain__settings__text}>
            {product.capacity}
          </p>
        </div>
        <div className={styles.card__contain__settings}>
          <p className={styles.card__contain__settings__title}>RAM</p>
          <p className={styles.card__contain__settings__text}>{product.ram}</p>
        </div>
      </div>

      <div className={styles.card__btn}>
        <button
          className={`${styles.card__btn__add}  ${
            isInCart(product.itemId) ? styles['card__btn__add--added'] : ''
          }`}
          onClick={() =>
            isInCart(product.itemId) ? toggleCart(product) : addToCart(product)
          }
        >
          {isInCart(product.itemId) ? 'Added' : 'Add to cart'}
        </button>
        <button
          className={`${styles.card__btn__like} ${isInFavorites(product.itemId) ? styles['card__btn__like--liked'] : ''}`}
          onClick={() => toggleFavorite(product)}
        >
          <img
            src={
              isInFavorites(product.itemId)
                ? './img/icons/favourites-Filled.svg'
                : './img/icons/heart.svg'
            }
            alt=""
          />
        </button>
      </div>
    </div>
  );
};
