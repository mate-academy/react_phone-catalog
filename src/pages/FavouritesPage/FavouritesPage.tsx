import './FavouritesPage.scss';
import { useContext } from 'react';

import { GlobalContext } from '../../store';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { PageContent } from '../../components/PageContent';

export const FavouritesPage = () => {
  const { favourites, isLoading } = useContext(GlobalContext);

  return (
    <div className="FavouritesPage">
      {isLoading && <Loader />}
      {!favourites.length ? (
        <>
          <Breadcrumbs />
          <h1 className="FavouritesPage__title">Favourites</h1>

          <div className="FavouritesPage__content">
            <p className="FavouritesPage__amount">
              {favourites.length !== 0 && `${favourites.length}
              ${favourites.length === 1 ? 'model' : 'models'}`}
            </p>
          </div>
          <div className="empty">
            <p className="empty__message">
              You don&apos;t have any favourite products.
            </p>
          </div>
        </>
      ) : (
        <>
          {!isLoading && !!favourites.length && (
            <PageContent
              title="Favourites"
              itemsList={favourites}
            />
          )}
        </>
      )}

    </div>
  );
};
