import { ProductSummary } from '../../../types/ProductSummary';
import { calculateDiscount } from '../../../utils/calculateDiscount';

type Props = {
  showDiscount?: boolean;
  product: ProductSummary;
};

export const Price: React.FC<Props> = ({ showDiscount, product }) => {
  return (
    <div className="card__price">
      {showDiscount ? (
        <>
          <div className="card__price-current">
            <h3>${product.price}</h3>
          </div>
          <div className="card__price-full">${product.fullPrice}</div>
          <h3 className="card__price-discount">
            {calculateDiscount(product).toFixed(1)}% OFF
          </h3>
        </>
      ) : (
        <>
          <div className="card__price-current">
            <h3>${product.fullPrice}</h3>
          </div>
        </>
      )}
    </div>
  );
};
