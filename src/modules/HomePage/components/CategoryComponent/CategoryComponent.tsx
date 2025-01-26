import React from 'react';

import styles from './CategoryComponent.module.scss';

import { Category } from '@HomePage/types/Category';

import { Image } from '@components/Image';

type Props = {
  category: Category;
};

export const CategoryComponent: React.FC<Props> = ({ category }) => {
  return (
    <article className={styles['category-component']}>
      <div
        className={styles['category-component__image-wrapper']}
        style={{ backgroundColor: category.bgColor }}
      >
        <Image
          src={category.img}
          className={styles['category-component__image']}
        />
      </div>

      <div className={styles['category-component__content']}>
        <h4>{category.title}</h4>
        <div className={styles['category-component__amount']}>
          {category.amount} models
        </div>
      </div>
    </article>
  );
};
