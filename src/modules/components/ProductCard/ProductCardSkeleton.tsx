import React from 'react';
import styles from './ProductCard.module.scss';
import classNames from 'classnames';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className={classNames(styles.product, styles.skeleton)}>
      <div
        className={classNames(styles.product__image, styles.skeleton__image)}
      />
      <div
        className={classNames(styles.product__title, styles.skeleton__title)}
      />

      <div
        className={classNames(styles.product__prices, styles.skeleton__prices)}
      >
        <div
          className={classNames(styles.product__price, styles.skeleton__price)}
        />
        <div
          className={classNames(styles.product__price, styles.skeleton__price)}
        />
      </div>

      <span
        className={classNames(styles.product__line, styles.skeleton__line)}
      />

      <div className={classNames(styles.product__info, styles.info)}>
        <div
          className={classNames(styles.info__screen, styles.skeleton__infoItem)}
        >
          <div className={styles.skeleton__key} />
          <div className={styles.skeleton__value} />
        </div>

        <div
          className={classNames(
            styles.info__capacity,
            styles.skeleton__infoItem,
          )}
        >
          <div className={styles.skeleton__key} />
          <div className={styles.skeleton__value} />
        </div>

        <div
          className={classNames(styles.info__ram, styles.skeleton__infoItem)}
        >
          <div className={styles.skeleton__key} />
          <div className={styles.skeleton__value} />
        </div>
      </div>
    </div>
  );
};
