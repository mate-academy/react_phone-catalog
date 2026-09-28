import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Icon } from '../Icon';
import { getImageUrl } from '../../utils/getImageUrl';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { isInCart, addToCart, removeFromCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const inCart = isInCart(product.itemId);
  const favorite = isFavorite(product.itemId);
  const detailsLink = `/product/${product.itemId}`;

  return (
    <article className={styles.card}>
      <Link to={detailsLink} className={styles.imageLink}>
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <h3 className={styles.name}>
        <Link to={detailsLink} className={styles.nameLink}>
          {product.name}
        </Link>
      </h3>

      <div className={styles.prices}>
        <span className={styles.price}>${product.price}</span>
        {product.fullPrice > product.price && (
          <span className={styles.fullPrice}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      <dl className={styles.specs}>
        <div className={styles.spec}>
          <dt>Screen</dt>
          <dd>{product.screen}</dd>
        </div>
        <div className={styles.spec}>
          <dt>Capacity</dt>
          <dd>{product.capacity}</dd>
        </div>
        <div className={styles.spec}>
          <dt>RAM</dt>
          <dd>{product.ram}</dd>
        </div>
      </dl>

      <div className={styles.actions}>
        <button
          type="button"
          className={cn(styles.addButton, { [styles.added]: inCart })}
          onClick={() => {
            if (inCart) {
              removeFromCart(product.itemId);
            } else {
              addToCart(product);
            }
          }}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={cn(styles.favButton, { [styles.active]: favorite })}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={() => toggleFavorite(product)}
        >
          <Icon name={favorite ? 'heart-filled' : 'heart'} />
        </button>
      </div>
    </article>
  );
};
