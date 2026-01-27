import styles from './FavoritesPage.module.scss';
import { useTranslation } from 'react-i18next';

import { useContext } from 'react';
import { StateContext } from '../../store';
import { ProductCatalogContext } from '../../ProductCatalogContext';
import { ProductCatalogItem } from '../../types/ProductCatalogItem';
import Breadcrumbs from '../shared/Breadcrumbs';
import ProductList from '../shared/ProductList';

const FavoritesPage = () => {
  const { t } = useTranslation();
  const state = useContext(StateContext);
  const { products } = useContext(ProductCatalogContext);

  const favoriteProducts: ProductCatalogItem[] = state.favorites.size
    ? products.filter(product => state.favorites.has(product.id))
    : [];

  const count = favoriteProducts.length;

  const itemsAmount = t('favorites.items', { count });

  return (
    <div className="container">
      <div>
        <Breadcrumbs />
        <h1 className={styles.favorites__title}>{t(`favorites.title`)}</h1>
        <p className={styles.favorites__counter}>{itemsAmount}</p>
        <ProductList pageProducts={favoriteProducts} />
      </div>
    </div>
  );
};

export default FavoritesPage;
