import React from 'react';
import { ICategory } from '../../../utils/interfaces/ICategory';
import styles from './Category.module.scss';
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader';

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
          <ContentLoader
            speed={2}
            width={340}
            height={84}
            viewBox="0 0 340 84"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="1" y="-33" rx="3" ry="3" width="594" height="47" />
          </ContentLoader>
        ) : (
          <p className={styles.category__count}>{`${counts} models`}</p>
        )}
      </div>
    </Link>
  );
};
