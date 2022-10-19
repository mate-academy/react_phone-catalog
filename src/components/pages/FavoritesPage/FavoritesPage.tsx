import React, { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../Breadcrumbs';
import { FavouriteContext } from '../../FavouriteProvider';
import { NoSearchResults } from '../../NoSearchResults';
import { ProductsList } from '../../ProductsList';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useContext(FavouriteContext);
  const [searchParams] = useSearchParams();
  const appliedQuery = searchParams.get('query') || '';

  const foundProducts: Product[] = useMemo(() => {
    if (appliedQuery) {
      return favourites.filter(
        product => product.name.toLowerCase().includes(
          appliedQuery.toLowerCase(),
        ),
      );
    }

    return [];
  }, [appliedQuery]);

  return (
    <div className="favouritesPage">
      {appliedQuery
        ? (
          <>
            {foundProducts.length > 0
              ? (
                <>
                  <div className="
                    favouritesPage__number
                    favouritesPage__number--found"
                  >
                    {`${foundProducts.length} ${foundProducts.length > 1 ? 'results' : 'result'}`}
                  </div>
                  <ProductsList products={foundProducts} />
                </>
              )
              : (
                <NoSearchResults query={appliedQuery} />
              )}
          </>
        )
        : (
          <>
            <div className="favouritesPage__nav">
              <Breadcrumbs />
            </div>
            <div className="favouritesPage__top">
              {favourites.length
                ? (
                  <>
                    <h1 className="favouritesPage__title">Favourites</h1>
                    <div className="favouritesPage__number">
                      {`${favourites.length} ${favourites.length > 1 ? 'items' : 'item'}`}
                    </div>
                  </>
                )
                : (
                  <h1 className="favouritesPage__title">
                    {'You don\'t have any favourite products yet'}
                  </h1>
                )}
            </div>

            <ProductsList products={favourites} />
          </>
        )}
    </div>
  );
};
