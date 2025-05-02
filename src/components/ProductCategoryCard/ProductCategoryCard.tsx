import React from 'react';
import classNames from 'classnames';

import { Category } from '../../types/Category';

import styles from './ProductCategoryCard.module.scss';

type Props = {
  title: string;
  productsAmount: number;
  category: Category;
};

export const ProductCategoryCard: React.FC<Props> = ({
  title,
  productsAmount,
  category,
}) => {
  return (
    <div>
      <div
        className={classNames(
          styles['product-category__card-banner'],
          category === Category.Phone &&
            styles['product-category__card-banner--phone'],
          category === Category.Tablet &&
            styles['product-category__card-banner--tablet'],
          category === Category.Accessories &&
            styles['product-category__card-banner--accessories'],
        )}
      ></div>

      <div className={styles['product-category__card-title-wrapper']}>
        <h4>{title}</h4>
        <p className="main-text main-text-secondary">{productsAmount}</p>
      </div>
    </div>
  );
};
