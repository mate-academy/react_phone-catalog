import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { ProductContext } from '../../shared/store/GlobalProvider';
import { productFilterByCategory } from '../../shared/utils/productFilterByCategory';

import styles from './ProductPageByCategoryPage.module.scss';
import { ProductCatalog } from './components/ProductCatalog/ProductCatalog';
import { CurrentPage } from '../../shared/components/CurrentPage/CurrentPage';

export const ProductPageByCategoryPage = () => {
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
