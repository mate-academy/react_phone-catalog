import { Product } from '../../types/Product';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[];
  isHotPrice: boolean;
};

export const ProductCards: React.FC<Props> = ({ products, isHotPrice }) => {
  return (
    <>
      {products.map(product => (
        <ProductCard
          key={product.id}
          isHotPrice={isHotPrice}
          product={product}
        />
      ))}
    </>
  );
};
