import './ProductCapacity.scss';
import { ProductDetails } from '../../../../pages/productPage/ProductPage';

export type ProductCapacityType = '128GB' | '256GB' | '512GB' | '1TB' | '2TB';

type ProductCapacityProps = {
  someProduct: ProductDetails;
  selectedCapacity: string;
  setSelectedCapacity: React.Dispatch<
    React.SetStateAction<ProductCapacityType>
  >;
};

const ProductCapacity = ({
  someProduct,
  selectedCapacity,
  setSelectedCapacity,
}: ProductCapacityProps) => {
  return (
    <div className="product-info__capacity">
      <p className="product-info__capacity--title">Select capacity</p>

      <div className="product-info__capacity-list">
        {someProduct.capacityAvailable.map(capacity => (
          <button
            key={capacity}
            className={`product-info__capacity-item ${
              selectedCapacity === capacity ? 'active' : ''
            }`}
            onClick={() => setSelectedCapacity(capacity as ProductCapacityType)}
          >
            {capacity}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductCapacity;
