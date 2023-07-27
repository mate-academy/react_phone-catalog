import { useContext } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import './FavouritesPage.scss';
import { FavContext } from '../../components/contexts/FavContextProvider';
import { FavItemList } from '../../components/FavItemList/FavItemList';

export const FavouritesPage = () => {
  const { favourites } = useContext(FavContext);

  return (
    <section className="favourites">
      <div className="favourites__breadcrumbs">
        <Breadcrumbs />
      </div>
      <h1 className="favourites__title">Favourites</h1>

      <div className="favourites__count">
        {` ${favourites.length} ${favourites.length > 1 ? 'items' : 'item'}`}
      </div>

      <div className="favourites__list">
        <FavItemList />
      </div>
    </section>
  );
};
