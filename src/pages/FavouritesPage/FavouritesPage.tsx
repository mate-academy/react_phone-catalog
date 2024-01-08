import { useSearchParams } from 'react-router-dom';

import './FavouritesPage.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { ProductList } from '../../components/ProductList/ProductList';
import {
  NoSearchResults,
} from '../../components/NoSearchResults/NoSearchResults';
import { applyFilterAndSort } from '../../helpers/applyFilterAndSort';
import { CartEmpty } from '../../components/CartEmpty/CartEmpty';
import { useAppSelector } from '../../app/hooks';

export const FavouritesPage = () => {
  const favourites = useAppSelector((state) => state.favourites.items);
  const [searchParams] = useSearchParams();

  const filteredProducts = applyFilterAndSort(favourites, searchParams);

  return (
    <div className="FavouritesPage">
      <BreadCrumbs />
      <h1 className="FavouritesPage__title">Favourites</h1>

      <div className="FavouritesPage__content">
        <p className="FavouritesPage__amount">
          {favourites.length !== 1 ? `${favourites.length} models` : '1 model'}
        </p>

        {!favourites.length ? (
          <CartEmpty />
        ) : (
          <>
            {!!filteredProducts.length && (
              <ProductList products={filteredProducts} />
            )}

            {!filteredProducts.length && <NoSearchResults />}
          </>
        )}
      </div>
    </div>
  );
};
