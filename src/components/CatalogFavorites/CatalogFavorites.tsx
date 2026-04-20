import { Link } from 'react-router-dom';
import './CatalogFavorites.scss';
import FavoritesList from './FavoritesList/FavoritesList';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { BasketProduct } from '../../types/BasketProduct';

type CatalogFavoritesProps = {
  favorites: FavoriteProduct[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
  baskets: BasketProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
};

const CatalogFavorites = ({
  favorites,
  setFavorites,
  baskets,
  setBaskets,
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
        baskets={baskets}
        setBaskets={setBaskets}
      />
    </div>
  );
};

export default CatalogFavorites;
