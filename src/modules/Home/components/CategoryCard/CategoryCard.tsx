import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.scss';

interface Props {
  title: string;
  img: string;
  count: number;
  path: string;
}

export const CategoryCard: React.FC<Props> = ({ title, img, count, path }) => {
  return (
    <Link to={path} className={styles.categoryCard}>
      <div className={styles.categoryCard__imageWrapper}>
        <img src={img} alt={title} />
      </div>
      <h4 className={styles.categoryCard__title}>{title}</h4>
      <p className={styles.categoryCard__count}>{count} models</p>
    </Link>
  );
};
