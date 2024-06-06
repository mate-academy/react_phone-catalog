import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ProductsList } from '../components/ProductsList';
import { useAppSelector } from '../app/hooks';
import { getCheckQuery } from '../helper';
import {
  selectPhones,
  selectProductsStatus,
} from '../features/productsSlice';

import { Loader } from '../components/Loader';
import { Error } from './Error';
import { Breadcrumbs } from '../components/Bredcrambs';

import '../components/ProductsList/ProductsList.scss';
import { IPhone } from '../types';

export const PhonesPage = () => {
  const phones: IPhone[] = useAppSelector(selectPhones) || [];
  const productsStatus = useAppSelector(selectProductsStatus);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredPhones = useMemo(() => {
    return phones.filter((phone) => getCheckQuery(phone.name, query));
  }, [query, phones]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <div className="productList">
      <Breadcrumbs />
      <h1 className="productList__title">Modile Phones</h1>
      <p className="productList__length">
        {`${filteredPhones.length} ${query.length > 0 ? 'result' : 'models'}`}
      </p>

      {productsStatus === 'loading' && <Loader />}
      {
        productsStatus === 'succeeded'
        && <ProductsList products={filteredPhones} />
      }
      {productsStatus === 'error'
        && <Error message="Sorry but phones not found" />}
    </div>
  );
};
