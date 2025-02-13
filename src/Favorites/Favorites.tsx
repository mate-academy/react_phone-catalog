import { useContext } from 'react';
import { IconsBar } from '../IconsBar/IconsBar';
import { ProductCard } from '../ProductCard/ProductCard';
import { FavoritesContext } from '../utils/contexts';
import './Favorites.scss';

export const Favorites = () => {
  const favoritesContext = useContext(FavoritesContext);

  if (!favoritesContext) {
    return null;
  }

  const { favorites } = favoritesContext;

  return (
    <div className="favorites">
      <div className="container">
        <IconsBar pageType="favorites" />

        <h2 className="title">Favourites</h2>

        <span className="text">
          {favorites.length === 1
            ? `${favorites.length} item`
            : `${favorites.length} items`}
        </span>

        <div className="favorites__products">
          {favorites.map(product => {
            return <ProductCard product={product} key={product.id} />;
          })}
        </div>
      </div>
    </div>
  );
};
