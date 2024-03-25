import { useContext } from 'react';

import { ProductContext } from '../../context/ProductContext';
import { ProductsList } from '../../components/Content/ProductsList';
import { Breadcrumb } from '../../components/Content/Breadcrumb';

export const Favourites = () => {
  const { favourites } = useContext(ProductContext);
  const pach = ['Favourites'];

  return (
    <>
      <Breadcrumb path={pach} />
      {favourites ? (
        <ProductsList produkt={favourites} loader={false} title="Favourites" />
      ) : (
        <h1>There are no favorite products</h1>
      )}
    </>
  );
};
