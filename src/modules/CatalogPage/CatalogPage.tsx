import { ProductsList } from './components/ProductsList';
import { Loader } from '../../components/Loader';
import styles from './CatalogPage.module.scss';
import { Error } from '../../components/Error';
import { useFetchProducts } from '../../utils/useFetchProducts';
import { useEffect } from 'react';

type Props = {
  productType: string;
};

export const CatalogPage: React.FC<Props> = ({ productType }) => {
  const { products, error, isLoading, setIsLoading, fetchProducts } =
    useFetchProducts();

  const filteredProductsList = products.filter(
    product => product.category === productType,
  );

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [productType, setIsLoading]);

  const showProducts = !isLoading && !error;

  return (
    <>
      {isLoading && <Loader />}
      {error && !isLoading && <Error fetchProducts={fetchProducts} />}

      {showProducts && filteredProductsList.length > 0 && (
        <ProductsList
          products={filteredProductsList}
          productType={productType}
        />
      )}

      {showProducts && !filteredProductsList.length && (
        <h3
          className={styles.catalog__text}
        >{`There are no ${productType} yet`}</h3>
      )}
    </>
  );
};
