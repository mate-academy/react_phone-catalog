import { Product } from '../../../types/ProductCard';
import { ProductCard } from '../../shared/components/ProductCard';
import './ProductsList.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <ul className="product-list">
      {products.map((product: Product) => (
        <li className="product-list__item" key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
