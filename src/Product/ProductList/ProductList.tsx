import { Product } from '../../Types/types';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductList.scss';

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
}) => {
  return (
    <div className="productList">
      {products.length > 0 ? (
        products.map(product => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))
      ) : (
        <p>No Products</p>
      )}
    </div>
  );
};
