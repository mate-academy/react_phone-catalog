import { ProductType } from '../../types/ProductType';
import { ProductContent } from '../ProductContent';

type Props = {
  className?: string;
  product: ProductType;
  showDiscount?: boolean;
};

export const Product: React.FC<Props> = ({
  className = '',
  product,
  showDiscount = true,
}) => {
  const hasDiscount = showDiscount && product.price < product.fullPrice;

  return (
    <article className={`product ${className}`.trim()}>
      <ProductContent product={product} showDiscount={hasDiscount} />
    </article>
  );
};
