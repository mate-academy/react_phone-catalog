import React from 'react';
import styles from './ProductCard.module.scss';
import classNames from 'classnames';
import { Product } from '../../../types/Product';
import { Link } from 'react-router-dom';
import { Buttons } from '../Buttons';

type Props = {
  product: Product;
  discount?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, discount }) => {
  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    itemId,
    category,
  } = product;

  const priceCell = () => (
    <div>
      {discount && (
        <div className={styles.product__prices}>
          <p className={classNames(styles.product__price)}>${price}</p>
          <p
            className={classNames(
              styles.product__price,
              styles['product__price-discount'],
            )}
          >
            ${fullPrice}
          </p>
        </div>
      )}
      {!discount && <p className={styles.product__price}>${fullPrice}</p>}
    </div>
  );

  return (
    <div className={styles.product}>
      <Link
        to={`../../${category}/${itemId}`}
        className={styles.product__image}
        style={{ backgroundImage: `url(${image})` }}
      />

      <Link
        to={`../../${category}/${itemId}`}
        className={styles.product__title}
      >
        {name}
      </Link>

      {priceCell()}

      <span className={styles.product__line} />

      <div className={classNames(styles.product__info, styles.info)}>
        <div className={styles.info__screen}>
          <p className={styles['info-key']}>Screen</p>
          <p className={styles['info-value']}>{screen}</p>
        </div>

        <div className={styles.info__capacity}>
          <p className={styles['info-key']}>Capacity</p>
          <p className={styles['info-value']}>{capacity}</p>
        </div>

        <div className={styles.info__ram}>
          <p className={styles['info-key']}>RAM</p>
          <p className={styles['info-value']}>{ram}</p>
        </div>
      </div>

      <Buttons category={category} id={itemId} />
    </div>
  );
};
