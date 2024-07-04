import React from 'react';
import styles from './CategoryCard.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  name: string;
  cover: string;
  numbers: number;
  path: string;
};

export const CategoryCard: React.FC<Props> = ({
  name,
  cover,
  numbers,
  path,
}) => (
  <article className={styles.category}>
    <Link to={path} className={styles.category__cover}>
      <img src={cover} alt={name} />
    </Link>

    <Link to={path} className={styles.category__header}>
      {name}
    </Link>

    <p className={styles.category__numbers}>{`${numbers}  models`}</p>
  </article>
);
