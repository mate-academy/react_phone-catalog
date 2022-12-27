import { NavHistory } from '../ProductsPage/sections/NavHistory';
import { FavouritesMain } from './FavouritesMain';

export const FavouritesPage = () => {
  return (
    <div className="container">
      <NavHistory pageType="favourites" />
      <FavouritesMain title="Favourites" />
    </div>
  );
};
