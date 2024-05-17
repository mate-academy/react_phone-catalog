import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import './Products.scss';
import { Category } from '../../types/Category';
import { useAppContext } from '../../context/context';
import { useSearchParams } from 'react-router-dom';
import { getPreparedProducts } from '../../helpers/getPreparedProducts';
import { ProductList } from '../../components/ProductList';

type Props = {
  category: Category;
};

export const Products: React.FC<Props> = ({ category }) => {
  const { products } = useAppContext();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const query = searchParams.get('query');
  const onPage = searchParams.get('onPage');
  const page = searchParams.get('page');

  const preparedProducts = getPreparedProducts(
    products.filter(item => item.category === category),
    {
      sort,
      query,
      onPage,
      page,
    },
  );

  return (
    <>
      <Breadcrumbs />

      <ProductList products={preparedProducts} />
    </>
  );
};
