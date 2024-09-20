import './BrandNew.scss';
import { ProductCard } from '../../../shared/components/ProductCard';
import { Product } from '../../../shared/types/types';

type Props = {
  product: Product;
};

export const BrandNew: React.FC<Props> = ({ product }) => {
  return (
    <>
      {product && (
        <ProductCard product={product} className="BrandNew__ProductCard" />
      )}
    </>
  );
};
