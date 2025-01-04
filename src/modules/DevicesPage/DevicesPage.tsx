import { useEffect } from 'react';
import styles from './DevicesPage.module.scss';
import { useLocation } from 'react-router-dom';
import Pagination from './components/Pagination';
import { useProducts } from '../shared/context/productsContext';
import DevicesList from './components/DevicesList';
import Sort from './components/Sort/Sort';
import SelectCardPerPage from './components/SelectCardPerPage';
import Loader from '../shared/components/Loader';
import ErrorMessage from './components/ErrorMessage';
import ProductNotFound from '../shared/components/ProductNotFound';
import Breadcrumbs from '../shared/components/Breadcrumbs';

const DevicesPage = () => {
  const { pathname } = useLocation();
  const currentPath = pathname[1].toUpperCase() + pathname.slice(2);

  const { products, isLoading, isError, setIsError, setCurrentPath } =
    useProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentPath(currentPath.toLowerCase());
  }, [pathname]);

  const filteredProducts = [...products].filter(
    item => item.category === currentPath.toLowerCase(),
  );

  return (
    <div className={styles.page}>
      <Breadcrumbs />

      <h1 className={styles.page__title}>
        {pathname[1].toUpperCase() + pathname.slice(2)} page
      </h1>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage message="Somethin went wrong!" setIsError={setIsError} />
      ) : products.length > 0 ? (
        <>
          <div className={styles.page__amount}>
            {filteredProducts.length} models
          </div>
          <Sort />
          <SelectCardPerPage />
          <DevicesList products={filteredProducts} />
          <div className={styles.page__pagination}>
            <Pagination />
          </div>
        </>
      ) : (
        <ProductNotFound currentPath={currentPath} />
      )}
    </div>
  );
};

export default DevicesPage;
