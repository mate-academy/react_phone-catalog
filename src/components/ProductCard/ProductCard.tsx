import React, { useState } from 'react';
import styles from './ProductCard.module.scss';
import { Products } from '../../types/Products';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import classNames from 'classnames';

type Props = {
  product: Products;
  path: string;
};

export const ProductCard: React.FC<Props> = ({ product, path }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const toggleCart = () => {
    setIsAddedToCart(prev => !prev);
  };

  const toggleFavourite = () => {
    setIsLiked(prev => !prev);
  };

  return (
    <article className={styles.product}>
      <div className={styles.product__content}>
        <Link to={path} className={styles.product__link}>
          <img
            src={`${product.image}`}
            className={styles.product__img}
            alt={product.name}
          />
        </Link>

        <Link to={path}>
          <p className={styles.product__title}>{product.name}</p>
        </Link>

        <p className={styles.product__price}>{product.price}</p>

        <div className={styles.product__divider} />

        <div className={styles.product__description}>
          {[
            { label: 'Screen', value: product.screen },
            { label: 'Capacity', value: product.capacity },
            { label: 'RAM', value: product.ram },
          ].map((item, index) => (
            <div key={index} className={styles.product__descriptionItem}>
              <span className={styles.product__label}>{item.label}</span>
              <span className={styles.product__value}>{item.value}</span>
            </div>
          ))}
        </div>

        <div className={styles.product__buttons}>
          {isAddedToCart ? (
            <button className={styles.product__cartActive} onClick={toggleCart}>
              Added
            </button>
          ) : (
            <button className={styles.product__cart} onClick={toggleCart}>
              Add to cart
            </button>
          )}

          <button
            className={classNames(styles.product__favourite, {
              [styles.product__favouriteActive]: isLiked,
            })}
            onClick={toggleFavourite}
          >
            {isLiked ? (
              <Icon type="favouriteActive" />
            ) : (
              <Icon type="favourite" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
