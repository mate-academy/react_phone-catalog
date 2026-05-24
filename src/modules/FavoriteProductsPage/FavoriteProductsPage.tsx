import React from 'react';
import { Card } from '../../components/Card';
import styles from './FavoriteProductsPage.module.scss';
import { useAppState } from '../../contexts/AppContext';
import { Breadcrumb } from '../../components/Breadcrumb';
import { getTranslation } from '../shared/utils/getTranslation';

export const FavoriteProductsPage: React.FC = () => {
  const { favouriteProducts, products, language } = useAppState();
  const t = getTranslation(language);

  return (
    <main className={styles.main}>
      <div className={styles.head}>
        <Breadcrumb />
        <div className={styles.headContent}>
          <h2 className={`${styles.title}`}>{t.favoritesPage.title}</h2>

          <span className={`${styles.counter} bodyText`}>
            {favouriteProducts.length === 1
              ? `1 ${t.favoritesPage.item}`
              : `${favouriteProducts.length} ${t.favoritesPage.items}`}
          </span>
        </div>
      </div>

      <div className={styles.cards}>
        {favouriteProducts.map(id => (
          <Card
            key={id}
            card={products.find(product => product.itemId === id)}
          />
        ))}
      </div>
    </main>
  );
};
