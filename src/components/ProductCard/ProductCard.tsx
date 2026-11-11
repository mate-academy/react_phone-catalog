import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Product } from '../../types/Product';

import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className={styles['product-card']}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles['product-card__link']}
      >
        <div className={styles['product-card__picture']}>
          <img
            src={`${import.meta.env.BASE_URL}${product.image}`}
            alt={product.name}
            className={styles['product-card__image']}
          />
        </div>
      </Link>

      <div className={styles['product-card__meta']}>
        <h4 className={styles['product-card__title']}>{product.name}</h4>

        <div className={styles['product-card__price']}>
          <span className={styles['product-card__new-price']}>
            <b>${product.price}</b>
          </span>
          <span className={styles['product-card__old-price']}>
            ${product.fullPrice}
          </span>
        </div>

        <hr className={styles['product-card__line']} />

        <div className={styles['product-card__rows']}>
          <div className={styles['product-card__row']}>
            <span className={styles['product-card__row-left']}>Screen</span>
            <span className={styles['product-card__row-right']}>
              {product.screen}
            </span>
          </div>
          <div className={styles['product-card__row']}>
            <span className={styles['product-card__row-left']}>Capacity</span>
            <span className={styles['product-card__row-right']}>
              {product.capacity}
            </span>
          </div>
          <div className={styles['product-card__row']}>
            <span className={styles['product-card__row-left']}>RAM</span>
            <span className={styles['product-card__row-right']}>
              {product.ram}
            </span>
          </div>
        </div>
      </div>

      <div className={styles['product-card__controller']}>
        <button className={styles['product-card__button-accept']}>
          Add to cart
        </button>
        <button
          className={`${styles['product-card__button-favorite']} ${styles['product-card__button-favorite--selected']}`}
        >
          {isFavorite ? (
            <FaHeart className={styles['product-card__icon-heart']} />
          ) : (
            <FaRegHeart className={styles['product-card__icon-heart']} />
          )}
        </button>
      </div>
    </article>
  );
};
