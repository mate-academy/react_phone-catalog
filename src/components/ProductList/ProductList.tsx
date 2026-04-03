import './ProductList.scss';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { useLocalStorage } from '../../api';

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  return (
    <div className="product__list">
      {products.map(product => (
        <ProductCard
          key={product.itemId}
          product={product}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      ))}
    </div>
  );
};

export default ProductList;
