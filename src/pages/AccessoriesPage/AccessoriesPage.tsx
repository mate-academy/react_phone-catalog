import React, { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsProvider';
import { ProductPage } from '../ProductPage';
import { NoResults } from '../../components/NoResults';

export const AccessoriesPage: React.FC = () => {
  const { accessories } = useContext(ProductsContext);

  return (
    <>
      {accessories.length ? (
        <ProductPage
          products={accessories}
          titlePage="Accessories"
          activePage="Accessories"
        />
      ) : (
        <NoResults category="Accessories" />
      )}
    </>
  );
};
