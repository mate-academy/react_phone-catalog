import './ProductList.scss';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';

type ProductListProps = {
  products: Product[];
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
};

const ProductList = ({
  products,
  favorites,
  setFavorites,
}: ProductListProps) => {
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
