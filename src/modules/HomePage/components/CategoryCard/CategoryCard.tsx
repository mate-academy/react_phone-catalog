import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Category } from '../../../../types/Category';

import styles from './CategoryCard.module.scss';

type Props = {
  category: Category;
  count: number;
};

export const CategoryCard: React.FC<Props> = ({ category, count }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.CategoryCard}
      onClick={() => navigate(category.link)}
    >
      <div
        className={styles.CategoryCard__imgBox}
        style={{ backgroundColor: category.bgc }}
      >
        <img src={category.img} alt={category.title} />
      </div>

      <h4 className={styles.CategoryCard__title}>{category.title}</h4>
      <p className={styles.CategoryCard__count}>{count} models</p>
    </div>
  );
};
