import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './ProductPage.module.scss';

import { Loader } from '../../shared/components/Loader';
import { CurrentPage } from '../../shared/components/CurrentPage';
import { ProductCatalog } from './components';
import { ProductContext } from '../../shared/store/GlobalProvider';

// eslint-disable-next-line
import { productFilterByCategory } from '../../shared/utils/productFilterByCategory';

export const ProductPage = () => {
  const { data, loading } = useContext(ProductContext);
  const { pathname } = useLocation();

  const products = productFilterByCategory(data, pathname);

  return (
    <main className={styles.productPage}>
      <div className={styles.productPage__container}>
        {!loading ? (
          <>
            <CurrentPage products={products} />
            <ProductCatalog products={products} />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </main>
  );
};
