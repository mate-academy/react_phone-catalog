import { Product } from '../../types/Product';
import ProductCard from '../ProductCard/ProductCard';
import './FavoritesList.scss';
import { useLocalStorage } from '../../api';

const FavoritesList = () => {
     const [favorites] = useLocalStorage<Product[]>('favcorites', []);

  return (
    <>
      <div className="favorites-list">
         {favorites.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
      </div>
    </>
  );
};

export default FavoritesList;
