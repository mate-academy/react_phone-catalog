import React from 'react';
import classNames from 'classnames';
import { ProductDetails } from '../../../../types';

type Props = {
  productDetails: ProductDetails;
  onCapacityChange: (capacity: string) => void;
};

export const ProductCapacity: React.FC<Props> = ({
  productDetails,
  onCapacityChange,
}) => (
  <div className="product-details__capacity">
    <p className="product-details__capacity-title typography__small-text">
      Select capacity
    </p>
    <ul className="product-details__capacity-list">
      {productDetails.capacityAvailable.map(capacity => (
        <li key={capacity} className="product-details__capacity-item">
          <button
            className={classNames(
              'product-details__capacity-button typography__body',
              { selected: capacity === productDetails.capacity },
            )}
            onClick={() => onCapacityChange(capacity.toLowerCase())}
          >
            {capacity}
          </button>
        </li>
      ))}
    </ul>
  </div>
);
