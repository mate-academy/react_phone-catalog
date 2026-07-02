import { Product } from '../../../../types/Product';
import { ProductCard } from '../../../shared/components/ProductCard';

type Props = {
  products: Product[];
  className?: string;
};

export const ProductsList = ({ products, className }: Props) => {
  return (
    <div className={className}>
      {products.map(product => (
        <ProductCard key={product.itemId} product={product} />
      ))}
    </div>
  );
};
