import './ProductList.scss';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="product__list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
