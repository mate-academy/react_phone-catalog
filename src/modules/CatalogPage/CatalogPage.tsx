import { ProductsList } from './components/ProductsList';
import { Loader } from '../../components/Loader';
import styles from './CatalogPage.module.scss';
import { Error } from '../../components/Error';
import { useFetchProducts } from '../../utils/useFetchProducts';

type Props = {
  productType: string;
};

export const CatalogPage: React.FC<Props> = ({ productType }) => {
  const { products, error, isLoading, fetchProducts } = useFetchProducts();

  const filteredProductsList = products.filter(
    product => product.category === productType,
  );

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
