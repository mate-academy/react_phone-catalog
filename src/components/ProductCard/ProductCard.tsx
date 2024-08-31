import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../typies';
import { FavouriteIcon } from '../../helpers/icons';
import { Link } from 'react-router-dom';

type ProductCardProps = {
  product: Product;
  type: string;
};

const HOT_PRICES = 'Hot prices';
// const URL = 'prodcuts';

export const ProductCard: React.FC<ProductCardProps> = ({ product, type }) => {
  const { name, image, price, fullPrice, screen, capacity, ram } = product;

  return (
    <article className={styles.container}>
      <div className={styles.inner}>
        <Link to={`/${product.category}/${product.itemId}`}>
          <img src={image} alt={name} className={styles.image} />
        </Link>

        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles.name}
        >
          {name}
        </Link>

        <div className={styles.prices}>
          <p className={styles.actual}>${price}</p>
          {type === HOT_PRICES && (
            <p className={styles.previous}>${fullPrice}</p>
          )}
        </div>

        <hr className={styles.line} />

        <div className={styles.details}>
          {screen && (
            <div className={styles.screen}>
              <p>Screen:</p>
              <p>{screen}</p>
            </div>
          )}

          {capacity && (
            <div className={styles.capacity}>
              <p>Capacity:</p>
              <p>{capacity}</p>
            </div>
          )}

          {ram && (
            <div className={styles.ram}>
              <p>RAM:</p>
              <p>{ram}</p>
            </div>
          )}
        </div>

        <div className={styles.buttons}>
          <button type="button" className={styles.add_to_card}>
            Add to cart
          </button>

          <button type="button" className={styles.favourite}>
            <FavouriteIcon />
          </button>
        </div>
      </div>
    </article>
  );
};
