import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './ProductPage.module.scss';

import { CurrentPage } from '../../shared/components/CurrentPage';
import { ProductCatalog } from './components';
import { ProductContext } from '../../shared/store/GlobalProvider';

// eslint-disable-next-line
import { productFilterByCategory } from '../../shared/utils/productFilterByCategory';

export const ProductPage = () => {
  const { data } = useContext(ProductContext);
  const { pathname } = useLocation();

  const products = productFilterByCategory(data, pathname);

  return (
    <main className={styles.productPage}>
      <div className={styles.productPage__container}>
        <CurrentPage showProductsCount={products.length} />
        <ProductCatalog products={products} />
      </div>
    </main>
  );
};
