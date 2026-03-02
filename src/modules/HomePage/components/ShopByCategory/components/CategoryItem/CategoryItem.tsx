import React from 'react';
import { Link } from 'react-router-dom';

import styles from './CategoryItem.module.scss';

type Props = {
  image: string;
  categoryName: string;
  countOfModels: number;
  link: string;
  bgColor: string;
};

export const CategoryItem: React.FC<Props> = ({
  image,
  categoryName,
  countOfModels,
  link,
  bgColor,
}) => {
  return (
    <Link to={`/${link}`} className={styles.item}>
      <div className={styles.imageBox} style={{ backgroundColor: bgColor }}>
        <img src={image} alt={categoryName} className={styles.image} />
      </div>

      <h4 className={styles.title}>{categoryName}</h4>
      <span className={styles.count}>{countOfModels} models</span>
    </Link>
  );
};
