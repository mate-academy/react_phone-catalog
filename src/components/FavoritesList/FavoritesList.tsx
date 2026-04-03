import { Product } from '../../types/Product';
import ProductCard from '../ProductCard/ProductCard';
import './FavoritesList.scss';
import { useLocalStorage } from '../../api';

const FavoritesList = () => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

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
              favorites={favorites}
              setFavorites={setFavorites}
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
