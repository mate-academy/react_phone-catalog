import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../services/productsApi';
import { selectPreparedProducts } from '../selectors/productsSelectors';
import { Catalog } from '../components/Catalog';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FC } from 'react';
import { Category, Sort } from '../types';
import { RootState } from '../store';

export const AccessoriesPage: FC = () => {
  const [searchParams] = useSearchParams();

  useGetProductsQuery();

  const preparedAccessories = useSelector((state: RootState) =>
    selectPreparedProducts(
      state,
      Category.Accessories,
      searchParams.get('sort') as Sort,
    ),
  );

  return (
    <div className="">
      <Breadcrumbs className="mt-6" />

      <h1 className="mt-6 text-h1 sm:mt-10">Accessories</h1>

      <Catalog products={preparedAccessories} />
    </div>
  );
};
