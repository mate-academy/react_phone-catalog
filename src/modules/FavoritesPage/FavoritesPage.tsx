import React from 'react';

import { useApp } from '../../context/AppContext';

import { ProductsList } from '../../components/ProductsList/ProductsList';

import { Breadcrumbs } from '../../components/Breadcrumbs';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites, language } = useApp();

  const title = language === 'ukr' ? 'Улюблене' : 'Favorites';

  const emptyText =
    language === 'ukr'
      ? 'Ваш список улюблених товарів порожній'
      : 'Your favorites list is empty';

  return (
    // Головний БЕМ-контейнер усієї сторінки улюблених
    <div className={styles['favorites-page']}>
      <Breadcrumbs currentPath={title} />

      {/* Великий заголовок сторінки  */}
      <h1 className={styles['favorites-page__title']}>{title}</h1>

      {/* Рядок із кількістю товарів  */}
      <p className={styles['favorites-page__count']}>
        {favorites.length} {language === 'ukr' ? 'моделей' : 'items'}
      </p>

      {/* Логічна перевірка: якщо в улюблених НУЛЬ товарів... */}
      {favorites.length === 0 ? (
        <p className={styles['favorites-page__empty']}>{emptyText}</p>
      ) : (
        <ProductsList products={favorites} />
      )}
    </div>
  );
};
