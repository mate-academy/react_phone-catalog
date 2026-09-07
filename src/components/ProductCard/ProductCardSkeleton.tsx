import React from 'react';
import classNames from 'classnames';

import styles from './ProductCard.module.scss';

type Props = {
  className?: string;
};

export const ProductCardSkeleton: React.FC<Props> = ({ className = '' }) => {
  return (
    <article
      className={classNames(
        styles['product-card'],
        styles['product-card--loading'],
        className,
      )}
    >
      <div
        className={classNames(
          styles['product-card__img-container'],
          styles['product-card__img-container--loading'],
        )}
      />

      <div
        className={classNames(
          styles['product-card__title'],
          styles['product-card__title--loading'],
        )}
      />

      <div
        className={classNames(
          styles['product-card__prices'],
          styles['product-card__prices--loading'],
        )}
      >
        <div
          className={classNames(
            styles['product-card__price'],
            styles['product-card__price--loading'],
          )}
        />
      </div>

      <div className={styles['product-card__decor']} />

      <ul className={styles['product-card__specs']}>
        {[...Array(3)].map((_, i) => (
          <li
            key={i}
            className={classNames(
              styles['product-card__spec'],
              styles['product-card__spec--loading'],
            )}
          />
        ))}
      </ul>

      <div className={styles['product-card__buttons']}>
        <div
          className={classNames(
            styles['product-card__cart-btn'],
            styles['product-card__cart-btn--loading'],
          )}
        />
        <div
          className={classNames(
            styles['product-card__fav-btn'],
            styles['product-card__fav-btn--loading'],
          )}
        />
      </div>
    </article>
  );
};
