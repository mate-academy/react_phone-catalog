import styles from './Favourites.module.scss';
import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import { useProducts } from '../../hooks/useProducts';
import { NavigateBar } from '../NavigateBar';
import { ProductCard } from '../ProductCard';
import { useTranslation } from 'react-i18next';

export const Favourites = () => {
  const { favorites } = useContext(ProductsContext);
  const { products } = useProducts();
  const { t } = useTranslation();

  const productsMap = Object.fromEntries(
    products.map(product => [product.itemId, product]),
  );

  return (
    <div className={styles.box}>
      <NavigateBar />
      <h1 className={styles.title}>{t('favourites')}</h1>
      <p className={styles.lengthitm}>
        {favorites.length} {t('items')}
      </p>

      <div className={styles.productlist}>
        {favorites.map(item => {
          const product = productsMap[item.id];

          if (!product) {
            return null;
          }

          return (
            <div key={item.id} className={styles.productItem}>
              <ProductCard product={product} turnon={item.active} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
