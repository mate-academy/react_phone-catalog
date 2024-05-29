import { ProductCard } from '../../../HomePage/components/ProductCard';
import styles from './ProductsLisc.module.scss';
import { Loader } from '../../../shared/Loader';
import { useAppSelector } from '../../../shared/hooks/hooks';
import usePageLocation from '../../../shared/hooks/usePageLocation';
import useSearch from '../../../shared/hooks/useSerch';

export const ProductsList = () => {
  const { loading, error } = useAppSelector(state => state.product);
  const { pageLocation } = usePageLocation();
  const { serchProduct } = useSearch();

  return (
    <>
      {loading && <Loader />}
      {error && <h1>{`There are no ${pageLocation.toLowerCase()} yet`}</h1>}
      {serchProduct.length === 0 && (
        <h1 className={styles.product__title}>
          {`There are no ${pageLocation.toLowerCase()} products matching the query`}
        </h1>
      )}
      {!error && (
        <div className={styles.product}>
          {serchProduct.map(phone => (
            <div key={phone.id} className={styles.product__page}>
              <ProductCard phone={phone} isDiscount={true} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
