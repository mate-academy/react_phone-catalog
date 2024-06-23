import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductsList.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className="productsList" data-cy="productList">
      {products.map(product => (
        <ProductCard key={product.name} product={product} />
      ))}
    </div>
  );
};
