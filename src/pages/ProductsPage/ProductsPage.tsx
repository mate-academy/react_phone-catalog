import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList';
import { ErrorNotification } from '../../components/ErrorNotification';
import { loadProducts } from '../../features/productsSlice';

export const ProductsPage:React.FC = () => {
  const dispatch = useAppDispatch();
  const { loaded, isError } = useAppSelector(state => state.products);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const location = useLocation();
  const category = location.pathname.slice(1);

  useEffect(() => {
    dispatch(loadProducts());
  }, [category]);

  return (
    <>
      {!query && <Breadcrumbs />}

      {loaded ? (
        <>
          {isError
            ? <ErrorNotification error={isError} />
            : <ProductsList />}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
