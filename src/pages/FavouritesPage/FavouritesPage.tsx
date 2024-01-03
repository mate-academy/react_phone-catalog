import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import './FavouritesPage.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { FavouritesContext } from '../../context/FavContext';
import { ProductList } from '../../components/ProductList';
import { NoSearchResults } from '../../components/NoSearchResults';
import { applyFilterAndSort } from '../../helpers/applyFilterAndSort';
import { CartEmpty } from '../../components/CartEmpty';

export const FavouritesPage = () => {
  const { favourites } = useContext(FavouritesContext);
  const [searchParams] = useSearchParams();

  const filteredProducts = applyFilterAndSort(favourites, searchParams);

  return (
    <div className="FavouritesPage">
      <BreadCrumbs />
      <h1 className="FavouritesPage__title">Favourites</h1>

      <div className="FavouritesPage__content">
        <p className="FavouritesPage__amount">
          {favourites.length !== 1
            ? `${favourites.length} models`
            : '1 model'}
        </p>

        {!favourites.length ? (
          <CartEmpty />
        ) : (
          <>
            {!!filteredProducts.length && (
              <ProductList products={filteredProducts} />
            )}

            {!filteredProducts.length && (
              <NoSearchResults />
            )}
          </>
        )}

      </div>
    </div>

  );
};
