import { useContext } from 'react';
import { motion } from 'framer-motion';

import { FavoriteContext } from '../../contexts/FavoriteContextProvider';
import { HistoryLocation } from '../../components/HistoryLocation';
import { FavoritesItemList } from './FavoritesItemList/FavoritesItemList';

import './FavoritesPage.scss';

export const FavoritesPage = () => {
  const { favorites } = useContext(FavoriteContext);
  const legthOfFavorites = favorites.length;

  return (
    <motion.section
      className="favorites container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
    </motion.section>
  );
};
