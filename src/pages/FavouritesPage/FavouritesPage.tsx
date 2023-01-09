import { useEffect } from 'react';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { NavHistory } from '../ProductsPage/NavHistory/NavHistory';
import { FavouritesMain } from './FavouritesMain';
import './FavouritesPage.scss';

export const FavouritesPage = () => {
  const [favourites, setFavourites] = useLocalStorage('favourites', '');

  useEffect(() => {
    window.addEventListener('storage', () => {
      if (setFavourites) {
        setFavourites(JSON.parse(localStorage.getItem('favourites') || '[]'));
      }
    });
  }, []);

  return (
    <div className="container">
      {favourites.length > 0 && (
        <NavHistory pageType="favourites" />
      )}
      <FavouritesMain title="Favourites" />
    </div>
  );
};
