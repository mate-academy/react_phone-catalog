import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import { useGetProductsQuery } from '../services/productsApi';
import {
  // selectProductsByCategory,
  selectSortedProductsByCategory,
} from '../selectors/productsSelectors';
import { Catalog } from '../components/Catalog';
// import { Breadcrumbs } from '../components/Breadcrumbs';
import { FC } from 'react';
import { Category, Sort } from '../types';

export const PhonesPage: FC = () => {
  const [searchParams] = useSearchParams();

  useGetProductsQuery();
  // const phones = useSelector(selectProductsByCategory(Category.Phones));
  const sortedPhones = useSelector(
    selectSortedProductsByCategory(
      Category.Phones,
      (searchParams.get('sort') as Sort) || Sort.Age,
    ),
  );

  return (
    <div className="">
      {/*<Breadcrumbs className="mt-[24px]" />*/}

      <h1 className="mt-[24px] text-h1 sm:mt-[40px]">Phones</h1>

      <Catalog products={sortedPhones} />
    </div>
  );
};
