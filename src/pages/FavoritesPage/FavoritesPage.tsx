import { useEffect, useState } from 'react';
import { NavLink, useOutletContext } from 'react-router-dom';
import {
  NoSearchResults,
} from '../../components/NoSearchResults/NoSearchResults';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { FavoritesContextType } from '../../types/FavoritesContextType';
import { Product } from '../../types/Product';
import './FavoritesPage.scss';

export const FavoritesPage = () => {
  const { favoritesItems, appliedQuery }
    = useOutletContext<FavoritesContextType>();

  const [displayedFavorites, setDisplayedFavorites]
    = useState<Product[]>([]);

  useEffect(() => {
    let result = [...favoritesItems];

    if (appliedQuery) {
      result = result.filter(product => {
        return product.name.toLowerCase().includes(appliedQuery.toLowerCase());
      });
    }

    setDisplayedFavorites(result);
  }, [appliedQuery, favoritesItems]);

  return (
    <div className="favoritesPage">
      <div className="pathInscription">
        <div className="nav-logo">
          <NavLink
            to="/"
          >
            <img src="img/icons/home-logo.svg" alt="home-logo" />
          </NavLink>
        </div>
        <img
          src="img/icons/GrayArrowRight.svg"
          alt="arrowRight"
          className="pathInscription__arrowRight"
        />
        <p className="pathInscription__text">Favourites</p>
      </div>
      <h1 className="favoritesPage__title">Favourites</h1>

      {!favoritesItems.length && !appliedQuery && (
        <p className="favoritesPage__empty-message">Your favourites is empty</p>
      )}

      {!displayedFavorites.length && appliedQuery && (
        <NoSearchResults />
      )}

      {displayedFavorites.length > 0 && (
        <>
          <p className="favoritesPage__count">{`${displayedFavorites.length} item${displayedFavorites.length > 1 ? 's' : ''}`}</p>
          <ProductsList products={displayedFavorites} />
        </>
      )}
    </div>
  );
};
