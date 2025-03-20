import React, { useContext } from 'react';
import { ProductCatalog } from '../ProductCatalog';
import { ProductsContext } from '../context/ProductsContext';

export const FavouritesPage = () => {
  const { favourites } = useContext(ProductsContext);

  return (
    <ProductCatalog
      title={'Favourites'}
      products={favourites}
      showFilter={false}
      showPagination={false}
    />
  );
};
