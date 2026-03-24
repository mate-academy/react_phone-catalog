import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.scss';

interface Props {
  title: string;
  img: string;
  path: string;
  count: number;
}

export const CategoryCard: React.FC<Props> = ({ title, img, path, count }) => {
  return (
    <Link to={path} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={img} alt={title} />
      </div>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.count}>{count} models</p>
    </Link>
  );
};
