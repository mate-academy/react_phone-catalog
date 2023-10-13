import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NoSearchResults } from '../../components/NoSearchResults';
import { ProductsList } from '../../components/ProductsList';
import { useFavourites } from '../../context/FavouritesContext';
import { getFilteredProducts } from '../../utils/productsHelper';
import './FavouritesPage.scss';

export const FavouritesPage = () => {
  const { favourites } = useFavourites();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const displayedFavourites = useMemo(() => {
    return getFilteredProducts(favourites, query);
  }, [favourites, query]);
  const total = displayedFavourites.length;

  return (
    <div className="FavouritesPage">
      <Breadcrumbs category="Favourites" />
      {favourites.length ? (
        <>
          {query ? (
            <>
              {!total ? (
                <NoSearchResults />
              ) : (
                <>
                  <p className="FavouritesPage__text">
                    {total === 1 ? '1 result' : `${total} results`}
                  </p>
                  <ProductsList products={displayedFavourites} />
                </>
              )}
            </>
          ) : (
            <>
              <h1 className="FavouritesPage__title">Favourites</h1>
              <p className="FavouritesPage__text">
                {total === 1 ? '1 item' : `${total} items`}
              </p>
              <ProductsList products={displayedFavourites} />
            </>
          )}
        </>
      ) : (
        <h1>You have no favourites</h1>
      )}
    </div>
  );
};
