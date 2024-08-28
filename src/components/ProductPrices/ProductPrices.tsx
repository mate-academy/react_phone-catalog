import { ProductType } from '../../types/ProductType';

type Props = {
  className?: string;
  product: ProductType;
  hasDiscount?: boolean;
};

export const ProductPrices: React.FC<Props> = ({
  className = '',
  product,
  hasDiscount = false,
}) => {
  return (
    <div className={`product-prices ${className}`.trim()}>
      <span className="product-prices__price">{`$${product.price}`}</span>
      {hasDiscount && (
        <span className="product-prices__price product-prices__price--full">{`$${product.fullPrice}`}</span>
      )}
    </div>
  );
};
