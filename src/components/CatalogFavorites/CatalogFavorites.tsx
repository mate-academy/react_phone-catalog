import { Link } from 'react-router-dom';
import './CatalogFavorites.scss';
import FavoritesList from '../FavoritesList/FavoritesList';
import { Product } from '../../types/Product';

type CatalogFavoritesProps = {
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
  isFavorite: boolean;
};

const CatalogFavorites = ({
  favorites,
  setFavorites,
  isFavorite,
}: CatalogFavoritesProps) => {
  return (
    <div className="catalog-favorites">
      <div className="catalog-favorites__top--icons">
        <Link to="/" className="catalog-favorites__icon--home"></Link>
        <Link
          to="/"
          className="catalog-favorites__icon--slider--right--gray"
        ></Link>
        <p className="catalog-favorites__top--text">Favorites</p>
      </div>
      <h1 className="catalog-favorites__title">Favorites</h1>
      <FavoritesList
        favorites={favorites}
        setFavorites={setFavorites}
        isFavorite={isFavorite}
      />
    </div>
  );
};

export default CatalogFavorites;
