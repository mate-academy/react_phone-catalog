import React from 'react';
import { Card } from '../../components/Card';
import styles from './FavoriteProductsPage.module.scss';
import { useAppState } from '../../contexts/AppContext';
import { Breadcrumb } from '../../components/Breadcrumb';
import { getTranslation } from '../shared/utils/getTranslation';

export const FavoriteProductsPage: React.FC = () => {
  const { favouriteProductsIds, products, language } = useAppState();
  const t = getTranslation(language);

  return (
    <main className={`
        ${styles.main} 
        ${favouriteProductsIds.length === 0 ? styles.emptyPage : ''}
      `}
    >
      <div className={styles.head}>
        <Breadcrumb />
        <div className={styles.headContent}>
          <h1 className={`${styles.title}`}>{t.favoritesPage.title}</h1>

          <span className={`${styles.counter} bodyText`}>
            {favouriteProductsIds.length === 1
              ? `1 ${t.favoritesPage.item}`
              : `${favouriteProductsIds.length} ${t.favoritesPage.items}`}
          </span>
        </div>
      </div>

      <div className={styles.cards}>
        {favouriteProductsIds.map((id) => (
          <Card key={id} card={
            products.find((product) => product.itemId === id)
          } />
        ))}
      </div>
    </main>
  );
};
