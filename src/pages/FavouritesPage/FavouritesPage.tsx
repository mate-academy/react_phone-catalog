import './favouritesPage.scss';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { SearchList } from '../../components/SearchList';
import { ProductsList } from '../../components/ProductsList';
import { getFavouritesList } from '../../components/interactionLocaleStorage';
import { NoResults } from '../../components/NoResults';

import { Product } from '../../type/product';

export const FavouritesPage = () => {
  const [searchParams] = useSearchParams();
  const [favourites, setFavourites] = useState<Product[] | null>(null);

  const getQuerySearchParam = useCallback(() => {
    return searchParams.get('query');
  }, [searchParams]);

  useEffect(() => {
    getFavouritesList(setFavourites);

    window.addEventListener('storage', () => {
      getFavouritesList(setFavourites);
    });

    return () => window.removeEventListener('storage', () => {
      getFavouritesList(setFavourites);
    });
  }, []);

  return !getQuerySearchParam() ? (
    <section className="favourites">
      <Breadcrumbs />

      <h1 className="favourites__title">
        Favourites
      </h1>

      <p className="favourites__models-number">
        {`${favourites?.length} models`}
      </p>

      {favourites && favourites.length > 0 ? (
        <ProductsList products={favourites} />
      ) : (
        <NoResults category="Favourites" />
      )}
    </section>
  ) : (
    <SearchList products={favourites || []} />
  );
};
