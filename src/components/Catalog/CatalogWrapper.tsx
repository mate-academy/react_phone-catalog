import React from 'react';
import { useParams } from 'react-router-dom';
import { Catalog } from './Catalog';

// Імпортуємо модульні стилі
import s from './Catalog.module.scss';

interface CatalogWrapperProps {
  products: any[];
}

const CatalogWrapper: React.FC<CatalogWrapperProps> = ({ products }) => {
  const { category } = useParams<{ category: string }>();

  // 1. Перевірка наявності категорії
  if (!category) {
    return <h2 className={s.errorMessage}>No category provided</h2>;
  }

  // 2. Перевірка завантаження даних
  if (!products || products.length === 0) {
    return (
      <div className={s.loaderWrapper}>
        <div className={s.loader}>Loading products...</div>
      </div>
    );
  }

  // 3. ПЕРЕДАЄМО ДАНІ В ОСНОВНИЙ КАТАЛОГ
  return <Catalog />;
};

export default CatalogWrapper;
