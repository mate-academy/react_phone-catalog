import React from 'react';
import styles from './CategoriesBlock.module.scss';
import { CategoryType } from '../../../../types/CategorieType';
import { Link } from 'react-router-dom';

interface Props {
  categories: CategoryType[];
}

export const CategoriesBlock: React.FC<Props> = ({ categories }) => {
  const CategorieCard = ({ categorie }: { categorie: CategoryType }) => {
    return (
      <div className={styles.categories__card}>
        <Link
          to={categorie.url}
          className={styles.categories__img}
          style={{ backgroundColor: categorie.bgColor }}
        >
          <img src={categorie.photo} alt={categorie.title} />
        </Link>
        <div className={styles.categories__details}>
          <h4 className={styles.categories__name}>{categorie.title}</h4>
          <p className={`body-text ${styles.categories__description}`}>
            {categorie.count} models
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <h2>Shop by category</h2>
      <div className={styles.categories}>
        {categories.map(categorie => (
          <CategorieCard key={categorie.title} categorie={categorie} />
        ))}
      </div>
    </>
  );
};
