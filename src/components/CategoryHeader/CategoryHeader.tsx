import React from 'react';
import styles from './CategoryHeader.module.scss';
import { Product } from '../../types/Product';
import { Loader } from '../Loader/Loader';

type Props = {
  categoryData: Product[];
};

export const CategoryHeader: React.FC<Props> = ({ categoryData }) => {
  if (!categoryData || categoryData.length === 0) {
    return (
      <div className={`${styles.loader}`}>
        <Loader />
      </div>
    );
  }
  const categoryName = categoryData[0].category;
  return (
    <>
      <div className={`${styles.category_path_container}`}>
        <img
          src="./img/icons/home-icon.svg"
          alt="home icon"
          className={`${styles.category_header_icon}`}
        />
        <img
          src="./img/icons/main-disabled-arrow.svg"
          alt="right arrow"
          className={`${styles.category_header_icon}`}
        />
        <p className={`${styles.category_path}`}>{categoryName}</p>
      </div>
      <h1 className={`${styles.category_header}`}>
        {categoryName === 'phones' ? 'Mobile Phones' : categoryName}
      </h1>
      <p className={`${styles.category_models_count}`}>
        {categoryData.length} models
      </p>
    </>
  );
};
