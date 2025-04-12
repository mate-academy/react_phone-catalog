import React from 'react';
import styles from './CategoryHeader.module.scss';
import { Product } from '../../types/Product';
import { Loader } from '../Loader/Loader';
import { useTheme } from '../ThemeContext/ThemeContext';
import { Link } from 'react-router-dom';

type Props = {
  categoryData: Product[];
};

export const CategoryHeader: React.FC<Props> = ({ categoryData }) => {
  const { theme } = useTheme();

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
        <Link to={'/'} className={`${styles.category_header_link}`}>
          <img
            src={
              theme === 'light'
                ? './img/icons/home-icon.svg'
                : './img/icons/home-icon-dark-theme.svg'
            }
            alt="home icon"
            className={`${styles.category_header_icon}`}
          />
        </Link>
        <img
          src={
            theme === 'light'
              ? './img/icons/main-disabled-arrow.svg'
              : './img/icons/dark-theme-arrow-disabled.svg'
          }
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
