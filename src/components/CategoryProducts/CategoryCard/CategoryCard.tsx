import React from 'react';
import { Link } from 'react-router-dom';

import { Category } from './Category';
import { SkeletonLine } from '../../Skeletons/SkeletonLine';

import styles from './CategoryCard.module.scss';

type Props = {
  isLoading?: boolean;
  category: Category;
  count: number;
};

export const CategoryCard: React.FC<Props> = ({
  category,
  count,
  isLoading,
}) => {
  return (
    <Link to={category.path} className={styles['category-card']}>
      <div
        className={styles['category-card__picture']}
        style={{ backgroundColor: category.background }}
      >
        <img
          src={category.src}
          alt={category.title}
          className={styles['category-card__image']}
          loading="lazy"
        />
      </div>

      <div>
        <p className={styles['category-card__title']}>{category.title}</p>
        <span className={styles['category-card__description']}>
          {isLoading ? <SkeletonLine height="21" /> : `${count} models`}
        </span>
      </div>
    </Link>
  );
};
