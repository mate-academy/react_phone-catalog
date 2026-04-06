import { Product } from '../../types/Product';
import ProductCard from '../ProductCard/ProductCard';
import './FavoritesList.scss';

type FavoritesListProps = {
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
  isFavorite: boolean;
};

const FavoritesList = ({
  favorites,
  setFavorites,
  isFavorite,
}: FavoritesListProps) => {
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
              isFavorite={isFavorite}
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
