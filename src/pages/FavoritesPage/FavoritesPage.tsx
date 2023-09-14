import { useContext } from 'react';
import { FavoriteContext } from '../../contexts/FavoriteContextProvider';
import { HistoryLocation } from '../../components/HistoryLocation';
import { FavoritesItemList } from './FavoritesItemList/FavoritesItemList';

import './FavoritesPage.scss';

export const FavoritesPage = () => {
  const { favorites } = useContext(FavoriteContext);
  const legthOfFavorites = favorites.length;

  return (
    <section className="favorites container">
      <div className="favorites__history-location">
        <HistoryLocation />
      </div>

      <h1>
        Favorites
      </h1>

      <div className="favorites--count">
        {
          `${legthOfFavorites} ${legthOfFavorites <= 1 ? 'item' : 'items'}`
        }
      </div>

      <FavoritesItemList />
    </section>
  );
};
