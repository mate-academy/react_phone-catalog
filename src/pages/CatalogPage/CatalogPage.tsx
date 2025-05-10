import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import styles from './CatalogPage.module.scss';
import { CATEGORY_CONFIG } from '../../constants/categoryConfig';

export const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();

  const categoryInfo = category ? CATEGORY_CONFIG[category] : null;

  if (!categoryInfo) {
    return <Navigate to="*" replace />;
  }

  useEffect(() => {
    document.title = categoryInfo.title;
  }, [categoryInfo]);

  return (
    <div>
      <h1 className={styles.title}>{categoryInfo.title}</h1>
      {/* Тут можна відрендерити список товарів */}
    </div>
  );
};
