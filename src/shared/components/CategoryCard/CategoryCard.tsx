import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types/Category';
import styles from './CategoryCard.module.scss';

interface Props {
  category: Category;
}

export const CategoryCard: React.FC<Props> = ({ category }) => {
  const { image, title, count, link } = category;

  return (
    <article className={styles.category}>
      <Link to={link}>
        <img src={image} alt={title} className={styles.picture} />
      </Link>

      <Link to={link} className={styles.title}>
        {title}
      </Link>

      <p className={styles.description}>{`${count} models`}</p>
    </article>
  );
};
