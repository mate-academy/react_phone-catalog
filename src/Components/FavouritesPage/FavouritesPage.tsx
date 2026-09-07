import { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { Catalog } from '../Catalog/Catalog';

export const FavouritesPage = () => {
  const { favourites } = useContext(ProductsContext);

  return (
    <div className="favourites-page">
      <Catalog
        title={'Favourites'}
        products={favourites}
        showFilter={false}
        showPagination={false}
      />
    </div>
  );
};
