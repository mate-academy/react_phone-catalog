import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './ProductCard.module.scss';
import fav from '../../images/icons/favourites.svg';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.product}>
      <div className={styles.product__container}>
        <Link to="/" className={styles.product__img_container}>
          <img
            src={product.image}
            alt="product"
            className={styles.product__image}
          />
        </Link>
        <Link to="/" className={styles.product__name}>
          {product.name}
        </Link>
        <div className={styles.product__prices}>
          <p className={styles.product__price}>${product.price}</p>
          <p className={styles.product__fullPrice}>${product.fullPrice}</p>
        </div>

        <div className={styles.product__line}></div>

        <div className={styles.product__details}>
          <div className={styles.product__detail}>
            <p className={cn(styles['product__detail--name'])}>Screen</p>
            <p className={cn(styles['product__detail--value'])}>
              {product.screen}
            </p>
          </div>

          <div className={styles.product__detail}>
            <p className={cn(styles['product__detail--name'])}>Capacity</p>
            <p className={cn(styles['product__detail--value'])}>
              {product.capacity}
            </p>
          </div>

          <div className={styles.product__detail}>
            <p className={cn(styles['product__detail--name'])}>RAM</p>
            <p className={cn(styles['product__detail--value'])}>
              {product.ram}
            </p>
          </div>
        </div>

        <div className={styles.product__buttons}>
          <button className={cn(styles['product__button--add'])}>
            Add to cart
          </button>
          <button className={cn(styles['product__button--fav'])}>
            <img src={fav} alt="fav" />
          </button>
        </div>
      </div>
    </div>
  );
};
