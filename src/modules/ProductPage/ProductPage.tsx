import { useLocation } from 'react-router-dom';

import styles from './ProductPage.module.scss';

import { CurrentPage } from '../../shared/components/CurrentPage';
import { ProductCatalog } from './components/ProductCatalog';

// eslint-disable-next-line
import { productFilterByCategory } from '../../shared/utils/productFilterByCategory';
import { useAppSelector } from '../../store/hooks';

export const ProductPage = () => {
  const data = useAppSelector(state => state.products.data);
  const { pathname } = useLocation();

  const products = Array.isArray(data)
    ? productFilterByCategory(data, pathname)
    : [];

  return (
    <main className={styles.productPage}>
      <div className={styles.productPage__container}>
        <CurrentPage showProductsCount={products.length} />
        <ProductCatalog products={products} />
      </div>
    </main>
  );
};
