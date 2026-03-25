import React from 'react';
import { Link } from 'react-router-dom';
import cl from 'classnames';

import { Product } from '../../types/Product';
import { FavouritesIcon } from '../Icons/FavouritesIcon';
import { useFavourites } from '../../hooks/useFavourites';
import { useCart } from '../../hooks/useCart';

import styles from './ProductCard.module.scss';

type Props = {
  showDiscount: boolean;
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product, showDiscount }) => {
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useFavourites();
  const { isInCart, addToCart, removeFromCart } = useCart();

  const handleLike = (productId: number) => {
    if (isFavourite(productId)) {
      removeFromFavourites(productId);
    } else {
      addToFavourites(product);
    }
  };

  const handleAddToCart = (productId: number) => {
    if (isInCart(productId)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const isAdded = isInCart(product.id);

  return (
    <article className={styles.card}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.link}
      >
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={`${import.meta.env.BASE_URL}/${product.image}`}
            alt={`${product.name} image`}
          />
        </div>

        <h3 className={styles.title}>{product.name}</h3>
      </Link>

      <div className={styles.prices}>
        <span className={styles.currentPrice}>${product.price}</span>

        {product.fullPrice !== product.price && showDiscount && (
          <span className={styles.oldPrice}>${product.fullPrice}</span>
        )}
      </div>

      <hr className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specName}>Screen</span>
          <span className={styles.specValue}>{product.screen}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.specName}>Capacity</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.specName}>RAM</span>
          <span className={styles.specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={cl(styles.cartButton, {
            [styles.disabled]: isAdded,
          })}
          onClick={() => handleAddToCart(product.id)}
        >
          {isAdded ? 'Added' : 'Add to cart'}
        </button>

        <button
          className={cl(styles.favouritesButton, {
            [styles.favouritesButtonActive]: isFavourite(product.id),
          })}
          onClick={() => handleLike(product.id)}
        >
          <FavouritesIcon isFilled={isFavourite(product.id)} />
        </button>
      </div>
    </article>
  );
};
