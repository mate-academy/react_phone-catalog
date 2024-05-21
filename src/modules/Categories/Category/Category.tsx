import React from 'react';
import { ICategory } from '../../../utils/interfaces/ICategory';
import styles from './Category.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  category: ICategory;
};

export const Category: React.FC<Props> = ({ category }) => {
  const { name, image, counts, isLoading, link } = category;

  return (
    <Link to={link} className={styles.category__link}>
      <div className="categories-item">
        <div className={styles.category__image}>
          <img
            className={styles.categories__picture}
            src={image}
            alt={`Product ${name}`}
          />
        </div>
        <h3 className={styles.category__title}>{name}</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p className={styles.category__count}>{`${counts} models`}</p>
        )}
      </div>
    </Link>
  );
};
