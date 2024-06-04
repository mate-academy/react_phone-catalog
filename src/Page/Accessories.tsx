import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Bredcrambs';
import { Loader } from '../components/Loader';
import { ProductsList } from '../components/ProductsList';
import { Error } from './Error';
import { getCheckQuery } from '../helper';
import { IAccessories } from '../types';
import {
  selectAccessories,
  selectProductsStatus,
} from '../features/productsSlice';
import { useAppSelector } from '../app/hooks';

export const Accessories = () => {
  const accessories: IAccessories[] = useAppSelector(selectAccessories) || [];
  const accessoriesStatus = useAppSelector(selectProductsStatus);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredAccessories = useMemo(() => {
    return accessories.filter((acc) => getCheckQuery(acc.name, query));
  }, [query, accessories]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <div className="phoneList">
      <Breadcrumbs />
      <h1 className="phoneList__title">Accessories</h1>
      <p className="phoneList__length">
        {`${filteredAccessories.length} ${query.length > 0 ? 'result' : 'models'}`}
      </p>

      {accessoriesStatus === 'loading' && <Loader />}
      {
        accessoriesStatus === 'succeeded'
        && <ProductsList products={filteredAccessories} />
      }
      {accessoriesStatus === 'error'
        && <Error message="Sorry but accessories not found" />}
    </div>
  );
};
