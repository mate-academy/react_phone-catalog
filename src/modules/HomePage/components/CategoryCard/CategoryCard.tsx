import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.scss';

type Props = {
  title: string;
  category: string;
  count: number;
  image: string;
  bgColor: string;
};

export const CategoryCard: React.FC<Props> = ({
  title,
  category,
  count,
  image,
}) => {
  return (
    <Link to={`/${category}`} className={styles.card}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} className={styles.image} />
        </div>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.count}>{count} models</p>
      </div>
    </Link>
  );
};
