import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard';
import './Products.scss';

type Props = {
  products: Product[];
};

export const Products: React.FC<Props> = ({ products }) => {
  return (
    <div className="products">
      {products.map(product => (
        <ProductCard key={product.id} product={product} isDiscount={false} />
      ))}
    </div>
  );
};
