import { ProductType } from '../../types/ProductType';
import { AddToCart } from '../AddToCart';
import { AddToFav } from '../AddToFav';

type Props = {
  className?: string;
  product: ProductType;
  hasDiscount?: boolean;
};

export const ProductButtons: React.FC<Props> = ({
  className = '',
  product,
}) => {
  return (
    <div className={`product-buttons ${className}`.trim()}>
      <AddToCart product={product} />
      <AddToFav product={product} />
    </div>
  );
};
