import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { Buttons } from '../Buttons';
import { ThemeContext } from '../../store/ThemeContex';
import { Theme } from '../../types/Theme';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={cn({
        [styles.product]: theme === Theme.Light,
        [styles['product-dark']]: theme === Theme.Dark,
      })}
    >
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.product__img_container}
      >
        <img
          src={product.image}
          alt="product"
          className={styles.product__image}
        />
      </Link>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={cn({
          [styles.product__name]: theme === Theme.Light,
          [styles['product__name-dark']]: theme === Theme.Dark,
        })}
      >
        {product.name}
      </Link>
      <div className={styles.product__prices}>
        <p
          className={cn({
            [styles.product__price]: theme === Theme.Light,
            [styles['product__price-dark']]: theme === Theme.Dark,
          })}
        >
          ${product.price}
        </p>
        <p
          className={cn({
            [styles.product__fullPrice]: theme === Theme.Light,
            [styles['product__fullPrice-dark']]: theme === Theme.Dark,
          })}
        >
          ${product.fullPrice}
        </p>
      </div>
      <div
        className={cn({
          [styles.product__line]: theme === Theme.Light,
          [styles['product__line-dark']]: theme === Theme.Dark,
        })}
      ></div>
      <div className={styles.product__details}>
        <div className={styles.product__detail}>
          <p
            className={cn({
              [styles['product__detail-name']]: theme === Theme.Light,
              [styles['product__detail-name-dark']]: theme === Theme.Dark,
            })}
          >
            Screen
          </p>
          <p
            className={cn({
              [styles['product__detail-value']]: theme === Theme.Light,
              [styles['product__detail-value-dark']]: theme === Theme.Dark,
            })}
          >
            {product.screen}
          </p>
        </div>

        <div className={styles.product__detail}>
          <p
            className={cn({
              [styles['product__detail-name']]: theme === Theme.Light,
              [styles['product__detail-name-dark']]: theme === Theme.Dark,
            })}
          >
            Capacity
          </p>
          <p
            className={cn({
              [styles['product__detail-value']]: theme === Theme.Light,
              [styles['product__detail-value-dark']]: theme === Theme.Dark,
            })}
          >
            {product.capacity}
          </p>
        </div>

        <div className={styles.product__detail}>
          <p
            className={cn({
              [styles['product__detail-name']]: theme === Theme.Light,
              [styles['product__detail-name-dark']]: theme === Theme.Dark,
            })}
          >
            RAM
          </p>
          <p
            className={cn({
              [styles['product__detail-value']]: theme === Theme.Light,
              [styles['product__detail-value-dark']]: theme === Theme.Dark,
            })}
          >
            {product.ram}
          </p>
        </div>

        <div>
          <Buttons product={product} />
        </div>
      </div>
    </div>
  );
};
