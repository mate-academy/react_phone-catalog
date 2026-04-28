import './ProductCapacity.scss';
import { ProductDetails } from '../../../../pages/productPage/ProductPage';

export type ProductCapacityType = '128GB' | '256GB' | '512GB' | '1TB' | '2TB';

type SetCapacity = React.Dispatch<React.SetStateAction<ProductCapacityType>>;

type ProductCapacityProps = {
  currentProduct: ProductDetails;
  selectedCapacity: ProductCapacityType;
  setSelectedCapacity: SetCapacity;
};

const ProductCapacity = ({
  currentProduct,
  selectedCapacity,
  setSelectedCapacity,
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
            onClick={() => setSelectedCapacity(capacity)}
          >
            {capacity}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductCapacity;
