import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Bredcrambs';
import { Error } from './Error';
import { ProductsList } from '../components/ProductsList';
import { Loader } from '../components/Loader';

import { getCheckQuery } from '../helper';
import { useAppSelector } from '../app/hooks';
import { selectProductsStatus, selectTalets } from '../features/productsSlice';
import { ITablet } from '../types';
import '../components/ProductsList/ProductsList.scss';

export const Tablets = () => {
  const tablets: ITablet[] = useAppSelector(selectTalets) || [];
  const productsStatus = useAppSelector(selectProductsStatus);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredTablets = useMemo(() => {
    return tablets.filter((tablet) => getCheckQuery(tablet.name, query));
  }, [query, tablets]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <div className="productList">
      <Breadcrumbs />
      <h1 className="productList__title">Tablets</h1>
      <p className="productList__length">
        {`${filteredTablets.length} ${query.length > 0 ? 'result' : 'models'}`}
      </p>

      {productsStatus === 'loading' && <Loader />}
      {
        productsStatus === 'succeeded'
        && <ProductsList products={filteredTablets} />
      }
      {productsStatus === 'error'
        && <Error message="Sorry but tablets not found" />}
    </div>
  );
};
