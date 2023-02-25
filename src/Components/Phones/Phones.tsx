import { Product } from '../../types/Product';
import { SkeletonLoading } from '../SkeletonLoading';
import { Card } from '../Card';

type PropTypes = {
  products: Product[]
  isLoading?: boolean;
};

export const Phones: React.FC<PropTypes> = ({ products, isLoading }) => {
  return (
    <>
      {isLoading ? (<SkeletonLoading />)
        : (
          products.map((product) => (
            <Card
              product={product}
              key={product.id}
            />
          ))
        )}
    </>
  );
};
