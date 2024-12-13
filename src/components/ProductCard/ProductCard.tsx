import React from 'react';
import styles from './ProductCard.module.scss';

import classNames from 'classnames';
import { Product } from '../../types/Product';
import { Link, useLocation } from 'react-router-dom';
import { Price } from '../Price';
import { ActionsButtons } from '../ActionsButtons';

type Props = {
  product: Product;
  classNameProp?: string;
};

export const ProductCard: React.FC<Props> = ({
  product,
  classNameProp = '',
}) => {
  const {
    itemId,
    category,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;

  const { pathname } = useLocation();
  const pathnameCategory = pathname.split('/')[1];

  const link =
    pathnameCategory !== category ? `/${category}/${itemId}` : itemId;

  return (
    <article className={classNames(styles.productCard, classNameProp)}>
      <Link to={link} className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.img} />
      </Link>

      <Link to={link}>
        <h3 className={styles.productCard__title}>{name}</h3>
      </Link>

      <Price
        price={price}
        fullPrice={fullPrice}
        classNameProp={styles.productCard__price}
      />

      <hr className="divider"></hr>

      <div className={classNames(styles.productCard__info, styles.info)}>
        <div className={styles.info__item}>
          <span className={styles.info__itemTitle}>Screen</span>

          <span className={styles.info__itemValue}>{screen}</span>
        </div>

        <div className={styles.info__item}>
          <span className={styles.info__itemTitle}>Capacity</span>

          <span className={styles.info__itemValue}>{capacity}</span>
        </div>

        <div className={styles.info__item}>
          <span className={styles.info__itemTitle}>RAM</span>

          <span className={styles.info__itemValue}>{ram}</span>
        </div>
      </div>

      <ActionsButtons product={product} />
    </article>
  );
};
