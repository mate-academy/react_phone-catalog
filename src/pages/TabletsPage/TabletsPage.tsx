import React, { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsProvider';
import { ProductPage } from '../ProductPage';
import { NoResults } from '../../components/NoResults';

export const TabletsPage: React.FC = () => {
  const { tablets } = useContext(ProductsContext);

  return (
    <>
      {tablets.length ? (
        <ProductPage
          products={tablets}
          titlePage="Tablets"
          activePage="Tablets"
        />
      ) : (
        <NoResults category="Tablets" />
      )}
    </>
  );
};
