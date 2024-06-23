/* eslint-disable @typescript-eslint/indent */
import { useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList';
import './FavoritesPage.scss';
import { FavoritesContext } from '../../components/FavoritesContext';

export const FavoritesPage = () => {
  const { favoritesProducts } = useContext(FavoritesContext);
  const [searchParams] = useSearchParams();

  const search = searchParams.get('query') || '';

  const searchedFavProducts =
    search.length > 0
      ? favoritesProducts.filter(fav =>
          fav.name.toLowerCase().includes(search.toLowerCase()),
        )
      : favoritesProducts;

  return (
    <div className="favoritesPage">
      {(searchedFavProducts.length === 0 && (
        <div className="cartPage__no-results">Your favorites cart is empty</div>
      )) || (
        <>
          <div data-cy="breadCrumbs" className="favoritesPage__link">
            <Link to="/home" className="icon icon--home" />
            <div className="icon icon--arrow-right--disabled" />
            <p className="productDetails__link-text">Favourites</p>
          </div>

          <div className="favoritesPage__titles">
            <div className="favoritesPage__main-title">Favourites</div>
            <div className="favoritesPage__subtitle">{`${favoritesProducts.length} items`}</div>
          </div>

          <div className="favoritesPage__list">
            <ProductsList products={searchedFavProducts} />
          </div>
        </>
      )}
    </div>
  );
};
