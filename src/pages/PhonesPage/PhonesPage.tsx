import React, { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsProvider';
import { ProductPage } from '../ProductPage';
import { NoResults } from '../../components/NoResults';

export const PhonesPage: React.FC = () => {
  const { phones } = useContext(ProductsContext);

  return (
    <>
      {phones.length ? (
        <ProductPage
          products={phones}
          titlePage="Mobile phones"
          activePage="Phones"
        />
      ) : (
        <NoResults category="Phones" />
      )}
    </>
  );
};
