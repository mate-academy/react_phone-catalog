import { ProductCard } from '../../../HomePage/components/ProductCard';
import styles from './ProductsLisc.module.scss';
import { Loader } from '../../../shared/Loader';
import { useAppSelector } from '../../../shared/hooks/hooks';
import usePageLocation from '../../../shared/hooks/usePageLocation';
import useSearch from '../../../shared/hooks/useSerch';
import usePagination from '../../../shared/hooks/usePagination';
import { useLocation } from 'react-router-dom';

export const ProductsList = () => {
  const { loading, error } = useAppSelector(state => state.product);
  const { pageLocation } = usePageLocation();
  const { serchProduct } = useSearch();
  const { search } = useLocation();
  const findPage = search
    .split('&')
    .find(item => item.includes('page'))
    ?.slice(5);

  let numberPage = findPage ? +findPage - 1 : 0;

  const { createPageProducts } = usePagination();

  if (createPageProducts.length <= 1) {
    numberPage = 0;
  }

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
          {createPageProducts[numberPage].map(phone => (
            <div key={phone.id} className={styles.product__page}>
              <ProductCard phone={phone} isDiscount={true} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
