import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../services/productsApi';
import { selectProductsByCategory } from '../selectors/productsSelectors';
import { Catalog } from '../components/Catalog';
// import { Breadcrumbs } from '../components/Breadcrumbs';
import { FC } from 'react';
import { Category } from '../types';

export const TabletsPage: FC = () => {
  useGetProductsQuery();
  const tablets = useSelector(selectProductsByCategory(Category.Tablets));

  return (
    <div className="">
      {/*<Breadcrumbs className="mt-[24px]" />*/}

      <h1 className="mt-[24px] text-h1 sm:mt-[40px]">Tablets</h1>

      <Catalog products={tablets} />
    </div>
  );
};
