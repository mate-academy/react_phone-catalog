import { useContext } from 'react';
import { Context } from '../../context/Context';
import { ProductsNav } from '../../components/ProductsNav/ProductsNav';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import './FavoritesPage.scss';

export const FavoritesPage: React.FC = () => {
  const { favorite } = useContext(Context);

  const favoriteCount = favorite.length;

  return (
    <div className="favourites">
      <div className="favourites__top">
        <ProductsNav />
      </div>
      <h1 className="favourites__title title">Favourites</h1>
      <p className="favourites__count">{`${favoriteCount} items`}</p>
      {favoriteCount === 0 ? (
        <h2 className="favourites__empty-title">
          There no favorite products found
        </h2>
      ) : (
        <div className="favourites__list">
          {favorite.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
