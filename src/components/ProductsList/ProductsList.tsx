import './ProductsList.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div data-cy="productList" className="productList">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
