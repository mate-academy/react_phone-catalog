import './ProductList.scss';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';

type ProductListProps = {
  products: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
  favorites: Product[];
};

const ProductList = ({
  products,
  setFavorites,
  favorites,
}: ProductListProps) => {
  return (
    <div className="product__list">
      {products.map(product => (
        <ProductCard
          key={product.itemId}
          product={product}
          setFavorites={setFavorites}
          favorites={favorites}
        />
      ))}
    </div>
  );
};

export default ProductList;
