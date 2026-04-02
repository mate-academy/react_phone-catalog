import { Product } from '../../types/Product';
import ProductCard from '../ProductCard/ProductCard';
import './FavoritesList.scss';
import { useLocalStorage } from '../../api';

const FavoritesList = () => {
  const [favorites] = useLocalStorage<Product[]>('favorites', []);
  const [products, setProducts] = useLocalStorage<Product[]>('favorites', []);

  const favoriteProducts = products.filter(pr =>
    favorites.some(fav => fav.itemId === pr.itemId),
  );

  return (
    <>
      <div className="favorites-list">
        <p className="favorites-list__models--counter">
          {favorites.length} models
        </p>
        {favorites.length ? (
          favoriteProducts.map(product => (
            <ProductCard
              key={product.itemId}
              product={product}
              setProducts={setProducts}
            />
          ))
        ) : (
          <p className="favorites-list__models--counter--empty">
            No favouri items selected
          </p>
        )}
      </div>
    </>
  );
};

export default FavoritesList;
