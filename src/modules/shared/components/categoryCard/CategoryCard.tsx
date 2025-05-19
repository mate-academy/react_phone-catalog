import React from 'react';
import { Link } from 'react-router-dom';

import styles from './CategoryCard.module.scss';

type Props = {
  to: string;
  imgSrc: string;
  cardName: string;
  countModels: number;
  color: 'phones' | 'tablets' | 'accessories';
};

export const CategoryCard: React.FC<Props> = ({
  to,
  imgSrc,
  cardName,
  countModels,
  color,
}) => {
  return (
    <Link to={to} className={styles.card}>
      <img
        src={imgSrc}
        alt="product image"
        className={`${styles.img} ${styles[color]}`}
      />
      <h4 className={styles.cardName}>{cardName}</h4>
      <p className={styles.p}>{countModels} models</p>
    </Link>
  );
};
