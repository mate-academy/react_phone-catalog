import React from 'react';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { ActionButtons } from '../ActionButtons';

interface Props {
  product: Product;
  mode?: 'newest' | 'discount' | undefined;
  classNameProp?: string;
}

export const ProductCard: React.FC<Props> = ({
  product,
  mode,
  classNameProp,
}) => {
  const {
    category,
    itemId,
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
    <article className={classNames(styles['product-card'], classNameProp)}>
      <Link to={link} className={styles['image-wrapper']}>
        <img src={image} alt={name} className={styles['product-card__img']} />
      </Link>

      <Link to={link}>
        <h3 className={styles['product-card__title']}>{name}&nbsp;&nbsp;</h3>
      </Link>

      <p className={styles['product-card__price']}>
        ${price}
        &nbsp;
        {mode === 'discount' && <span>${fullPrice}</span>}
      </p>

      <hr className="divider"></hr>

      <div className={classNames(styles['product-card__info'], styles.info)}>
        <div className={styles.info__item}>
          <span className={styles.info__item__title}>Screen</span>

          <span className={styles.info__item__value}>{screen}</span>
        </div>

        <div className={styles.info__item}>
          <span className={styles.info__item__title}>Capacity</span>

          <span className={styles.info__item__value}>{capacity}</span>
        </div>

        <div className={styles.info__item}>
          <span className={styles.info__item__title}>RAM</span>

          <span className={styles.info__item__value}>{ram}</span>
        </div>
      </div>

      <ActionButtons product={product} />
    </article>
  );
};
