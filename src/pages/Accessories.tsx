import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../services/productsApi';
import { selectProductsByCategory } from '../selectors/productsSelectors';
import { Catalog } from '../components/Catalog';
// import { Breadcrumbs } from '../components/Breadcrumbs';
import { FC } from 'react';
import { Category } from '../types';

export const AccessoriesPage: FC = () => {
  useGetProductsQuery();
  const accessories = useSelector(
    selectProductsByCategory(Category.Accessories),
  );

  return (
    <div className="">
      {/*<Breadcrumbs className="mt-[24px]" />*/}

      <h1 className="mt-[24px] text-h1 sm:mt-[40px]">Accessories</h1>

      <Catalog products={accessories} />
    </div>
  );
};
