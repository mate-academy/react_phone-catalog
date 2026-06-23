import React from 'react';
import styles from './CategorySelectCard.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  quantity: number;
  image: string;
  path: string;
};

export const CategorySelectCard: React.FC<Props> = ({
  title,
  quantity,
  image,
  path,
}) => {
  return (
    <Link to={path} className={styles.selectCategory}>
      <div className={styles.selectCategory__imageWrapper}>
        <img
          className={styles.selectCategory__image}
          src={image}
          alt="category image"
        />
      </div>
      <div className={styles.selectCategory__description}>
        <p className={styles.selectCategory__title}>{title}</p>
        <p className={styles.selectCategory__models}>{quantity} models</p>
      </div>
    </Link>
  );
};
