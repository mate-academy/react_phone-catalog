import React from 'react';
import styles from './CategoryCard.module.scss';

type Props = {
  img: string;
  name: string;
  count: number;
};

export const CategoryCard: React.FC<Props> = ({ img, name, count }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={img} alt="category" />
      </div>
      <h4>{name}</h4>
      <p>{count} models</p>
    </div>
  );
};
