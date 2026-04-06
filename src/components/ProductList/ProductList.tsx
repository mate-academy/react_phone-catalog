import './ProductList.scss';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';

type ProductListProps = {
  products: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
  isFavorite: boolean;
};

const ProductList = ({
  products,
  setFavorites,
  isFavorite,
}: ProductListProps) => {
  return (
    <div className="product__list">
      {products.map(product => (
        <ProductCard
          key={product.itemId}
          product={product}
          setFavorites={setFavorites}
          isFavorite={isFavorite}
        />
      ))}
    </div>
  );
};

export default ProductList;
