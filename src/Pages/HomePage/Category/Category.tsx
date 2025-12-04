import React from 'react';
import styles from './Category.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  imgSrc: string;
  categoryName: string;
  categoryLength: number | undefined;
  categoryPath: string;
}

export const Category: React.FC<Props> = ({
  imgSrc,
  categoryName,
  categoryLength,
  categoryPath,
}) => {
  return (
    <Link to={`/${categoryPath}`} className={styles.category__card}>
      <div className={styles['category__card-content']}>
        <div className={styles.category__photo}>
          <img src={imgSrc} alt="" className={styles.category__img} />
        </div>
        <div className={styles['card__title-wrapper']}>
          <h4 className={styles.category__title}>{categoryName}</h4>
          <span className={styles.category__quantity}>
            {categoryLength} models
          </span>
        </div>
      </div>
    </Link>
  );
};
