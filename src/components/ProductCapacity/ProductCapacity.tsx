import { ProductDetailsType } from 'types/productInfoTypes';

import React from 'react';
import cn from 'classnames';
import style from './ProductCapacity.module.scss';

interface ProductCapacityProps {
  onCapacitySelect: (capacity: string) => void;
  productDetails: ProductDetailsType;
}

export const ProductCapacity: React.FC<ProductCapacityProps> = ({
  productDetails,
  onCapacitySelect,
}) => {
  return (
    <div className={style.product_capacity}>
      <p className={cn(style.product_capacity__title, 'small-text')}>
        Select capacity
      </p>

      <ul className={style.product_capacity__list}>
        {productDetails.capacityAvailable.map(capacity => (
          <li key={capacity} className={style.product_capacity__item}>
            <button
              className={`${style.product_capacity__button} ${capacity === productDetails.capacity ? `${style.selected}` : ''}`}
              onClick={() => onCapacitySelect(capacity)}
            >
              {capacity}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
