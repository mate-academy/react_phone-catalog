import { Link } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import '../styles/blocks/Favorites.scss';
import { Loader } from '../components/Loader/Loader';
import { Product } from '../types';
import { Cart } from '../types/cart';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { NoSearchResult } from '../components/NoSearchResult/NoSearchResult';

type Props = {
  isLoading: boolean,
  handleSetCarts: (value: Product) => void;
  carts:Cart[];
  handleSetFavorites: (value:Product) => void;
  favorites: Product[];
  query: string;
  handleSetQuery: (value:string) => void;
  updatePageHeight: () => void;
};

export const Favorites:React.FC<Props> = ({
  isLoading,
  handleSetCarts,
  carts,
  handleSetFavorites,
  favorites,
  query,
  handleSetQuery,
  updatePageHeight,
}) => {
  useEffect(() => handleSetQuery(''), []);

  const filtredFavorites = useMemo(() => {
    updatePageHeight();

    return favorites.filter(favorit => {
      const nameToLower = favorit.name.toLowerCase();
      const queryToLower = query.trim().toLowerCase();

      return nameToLower.includes(queryToLower);
    });
  }, [query, favorites, updatePageHeight]);

  return (
    <>
      { isLoading ? (
        <Loader />
      ) : (
        <div className="favorites-page-container">
          <div className="icon-navigation
        favorites-page-container__icon-navigation"
          >
            <Link to="/">
              <img src="./img/icons/home.svg" alt="#logo" />
            </Link>
            <img src="./img/icons/arrowright.svg" alt="#logo" />
            <span className="icon-navigation-text">Favorites</span>
          </div>
          <h1 className="title favorites-page-container__title">Favourites</h1>

          {(filtredFavorites.length === 0 && query) ? (
            <NoSearchResult />
          ) : (
            <>
              <p className="items-counter
              favorites-page-container__items-counter"
              >
                {filtredFavorites.length === 1 ? (
                  `${filtredFavorites.length} item`
                ) : (
                  `${filtredFavorites.length} items`
                )}
              </p>
              <div className="products-list
          favorites-page-container__products-list"
              >
                {filtredFavorites.map(favorit => (
                  <ProductCard
                    product={favorit}
                    moveLeft={0}
                    handleSetCarts={handleSetCarts}
                    carts={carts}
                    handleSetFavorites={handleSetFavorites}
                    favorites={favorites}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
