import './ProductCapacity.scss';
import { ProductDetails } from '../../../../pages/productPage/ProductPage';
import { useState } from 'react';

type ProductCapacityProps = {
  someProduct: ProductDetails;
};

const ProductCapacity = ({ someProduct }: ProductCapacityProps) => {
  const [selectedCapacity, setSelectedCapacity] = useState(
    someProduct.capacityAvailable[0],
  );

  return (
    <div className="product-info__capacity">
      <p>Select capacity</p>

      <div className="product-info__capacity-list">
        {someProduct.capacityAvailable.map(capacity => (
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
