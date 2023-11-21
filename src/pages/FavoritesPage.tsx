import { useFavouritesContext } from '../context/FavouritesContext';
import { ProductsList } from '../components/ProductsList';
import './FavoritesPage.scss';

export const FavoritesPage = () => {
  const { favourites } = useFavouritesContext();

  return (
    <div className="favorites">
      <ProductsList
        title="Favourites"
        products={favourites}
      />
    </div>
  );
};
