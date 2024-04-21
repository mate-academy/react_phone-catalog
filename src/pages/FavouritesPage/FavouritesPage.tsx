import { useContext, useMemo } from 'react';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import './FavouritesPage.scss';
import { FavouritesContext } from '../../components/FavouritesContextProvider';
import { ProductList } from '../../components/ProductList';
import { Notification } from '../../components/Notification';
import { QuerySearchContext } from '../../components/QuerySearchContext';

export const FavouritesPage = () => {
  const { favourites } = useContext(FavouritesContext);
  const { appliedQuery } = useContext(QuerySearchContext);

  const preparedProducts = useMemo(() => {
    return favourites
      .filter(item => {
        return item.name.toLowerCase().includes(appliedQuery.toLowerCase());
      });
  }, [appliedQuery, favourites]);

  return (
    <div className="favourites-page">
      <div className="favourites-page__content">
        <div className="favourites-page__top">
          <BreadCrumbs />
          <h1 className="favourites-page__title">Favourites</h1>
          <p className="favourites-page__quantity">
            {`${favourites.length} items`}
          </p>
        </div>

        {favourites.length ? (
          <ProductList products={preparedProducts} />
        ) : (
          <Notification
            message="You have not selected your favorite products yet"
          />
        )}
      </div>
    </div>
  );
};
