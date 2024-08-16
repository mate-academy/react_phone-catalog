import { ProductsList } from './components/ProductsList';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';
import { Loader } from '../../components/Loader';
import styles from './CatalogPage.module.scss';

type Props = {
  productType: string;
};

export const CatalogPage: React.FC<Props> = ({ productType }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const productsFromApi = await getProducts();

      setProducts(productsFromApi);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [productType]);

  const filteredProductsList = products.filter(
    product => product.category === productType,
  );

  const showProducts = !isLoading && !error;

  return (
    <>
      {isLoading && <Loader />}
      {error && !isLoading && (
        <div className={styles.catalog__error}>
          <h2>Something went wrong</h2>
          <div className={styles.catalog__button} onClick={fetchProducts}>
            Reload
          </div>
        </div>
      )}

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
