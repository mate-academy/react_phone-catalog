import ProductCard from '../ProductCard/ProductCard';
import './FavoritesList.scss';
import { FavoriteProduct } from '../../types/FavoriteProduct';

type FavoritesListProps = {
  favorites: FavoriteProduct[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
};

const FavoritesList = ({ favorites, setFavorites }: FavoritesListProps) => {
  return (
    <>
      <div className="favorites-list">
        <div className="favorites-list__container"></div>
        <p className="favorites-list__items--counter">
          {favorites.length} items
        </p>
        {favorites.length ? (
          favorites.map(product => (
            <ProductCard
              key={product.itemId}
              product={product}
              setFavorites={setFavorites}
              favorites={favorites}
            />
          ))
        ) : (
          <p className="favorites-list__items--counter--empty">
            No favouri items selected
          </p>
        )}
      </div>
    </>
  );
};

export default FavoritesList;
