import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../../types';
import { useCart } from '../../../contexts/CartContext';
import { useFavorites } from '../../../contexts/FavoritesContext';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const inCart = isInCart(product.itemId);
  const inFavorites = isFavorite(product.itemId);
  const detailPath = `/${product.category}/${product.itemId}`;

  return (
    <article className={styles.card}>
      <Link to={detailPath} className={styles.imageLink}>
        <img
          src={
            product.image.startsWith('/') ? product.image : `/${product.image}`
          }
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link to={detailPath} className={styles.title}>
        {product.name}
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>${product.price}</span>
        {product.fullPrice !== product.price && (
          <span className={styles.fullPrice}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.spec}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue}>{product.screen}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={classNames(styles.cartBtn, {
            [styles.cartBtnAdded]: inCart,
          })}
          onClick={() => !inCart && addToCart(product)}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={classNames(styles.favoriteBtn, {
            [styles.favoriteBtnActive]: inFavorites,
          })}
          onClick={() => toggleFavorite(product)}
          aria-label={
            inFavorites ? 'Remove from favorites' : 'Add to favorites'
          }
        >
          {inFavorites ? (
            <i className="fa-solid fa-heart" />
          ) : (
            <i className="fa-regular fa-heart" />
          )}
        </button>
      </div>
    </article>
  );
};
