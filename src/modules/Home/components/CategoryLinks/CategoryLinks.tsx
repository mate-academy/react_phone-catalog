import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './CategoryLinks.module.scss';

import { CATEGORIES } from '../../../../utils/categories';
import { filterProductsByCategory } from '../../../../utils/filtering';
import { useProducts } from '../../../../hooks/useProducts';

export const CategoryLinks: React.FC = () => {
  const { products } = useProducts();
  const { t } = useTranslation();

  const HOME_CATEGORIES = CATEGORIES.map(cat => {
    const categoryProducts = filterProductsByCategory(
      products,
      cat.apiEndpoint,
    );

    return {
      ...cat,
      image: `${import.meta.env.BASE_URL}img/category-${cat.apiEndpoint}.webp`,
      count: categoryProducts.length,
    };
  });

  return (
    <div className={styles.homePage}>
      <h2 className={styles.homePageTitle}>{t('title.shopByCategory')}</h2>

      <div className={styles.homePageBox}>
        {HOME_CATEGORIES.map(cate => (
          <Link className={styles.homePageLink} key={cate.path} to={cate.path}>
            <img
              className={styles.homePageImg}
              src={cate.image}
              alt={cate.title}
            />
            <span className={styles.categoryTitle}>
              {t(`nav.${cate.title}`).toLowerCase()}
            </span>
            <span className={styles.categoryCount}>
              {t('common.total', { count: cate.count })}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
