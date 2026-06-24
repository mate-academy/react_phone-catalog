import './ProductCapacity.scss';
import { ProductDetails } from '../../../../pages/productPage/ProductPage';

export type ProductCapacityType = '128GB' | '256GB' | '512GB' | '1TB' | '2TB';

type ProductCapacityProps = {
  currentProduct: ProductDetails;
  selectedCapacity: ProductCapacityType;
  onSelectCapacity: (capacity: string) => void;
};

const ProductCapacity = ({
  currentProduct,
  selectedCapacity,
  onSelectCapacity,
}: ProductCapacityProps) => {
  return (
    <div className="product-info__capacity">
      <p className="product-info__capacity--title">Select capacity</p>

      <div className="product-info__capacity-list">
        {currentProduct.capacityAvailable.map(capacity => (
          <button
            key={capacity}
            className={`product-info__capacity-item ${
              selectedCapacity === capacity ? 'active' : ''
            }`}
            onClick={() => onSelectCapacity(capacity)}
          >
            {capacity}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductCapacity;
