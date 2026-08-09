/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './ProductCard.module.scss';

import { Product } from '../../types/Product';

import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { cart, addToCart } = useCart();

  const {
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useFavorites();

  const isAdded = cart.some(
    item => item.id === product.id,
  );

  const favorite = isFavorite(product.id);

  return (
    <article className={styles.productCard}>
      <Link to={`/${product.category}/${product.itemId}`}>
        <img
          src={`/${product.image.replace(/^\/+/, '')}`}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.productLink}
      >
        {product.name}
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>
          ${product.price}
        </span>

        <span className={styles.fullPrice}>
          ${product.fullPrice}
        </span>
      </div>

      <hr className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.spec}>
          <span>Screen</span>
          <strong>{product.screen}</strong>
        </div>

        <div className={styles.spec}>
          <span>Capacity</span>
          <strong>{product.capacity}</strong>
        </div>

        <div className={styles.spec}>
          <span>RAM</span>
          <strong>{product.ram}</strong>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          type="button"
          className={classNames(
            styles.addButton,
            {
              [styles.added]: isAdded,
            },
          )}
          onClick={() => addToCart(product)}
          disabled={isAdded}
        >
          {isAdded
            ? 'Added to cart'
            : 'Add to cart'}
        </button>

        <button
          type="button"
          className={classNames(
            styles.favoriteButton,
            {
              [styles.favoriteActive]: favorite,
            },
          )}
          onClick={() => {
            if (favorite) {
              removeFavorite(product.id);
            } else {
              addFavorite(product);
            }
          }}
          aria-label="Add to favourites"
        >
          <img
            src={
              favorite
                ? '/img/icons/heart-filled.png'
                : '/img/icons/heart.png'
            }
            alt="Favorite"
            className={styles.favoriteIcon}
          />
        </button>
      </div>
    </article>
  );
};
