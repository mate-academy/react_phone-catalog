import { Link } from 'react-router-dom';
import './CatalogFavorites.scss';
import FavoritesList from './FavoritesList/FavoritesList';

const CatalogFavorites = () => {
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
      <FavoritesList />
    </div>
  );
};

export default CatalogFavorites;
