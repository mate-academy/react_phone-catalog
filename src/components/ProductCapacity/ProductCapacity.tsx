import React from 'react';
import style from './ProductCapacity.module.scss';
import { ProductDetailsType } from '../../types/ProductDetailsType';

interface Props {
  onCapacitySelect: (capacity: string) => void;
  productDetails: ProductDetailsType;
}

export const ProductCapacity: React.FC<Props> = ({
  productDetails,
  onCapacitySelect,
}) => {
  return (
    <div className={style.product_details__capacity}>
      <p className={style.product_details__capacity_title}>Select capacity</p>

      <ul className={style.product_details__capacity_list}>
        {productDetails.capacityAvailable.map(capacity => (
          <li key={capacity} className={style.product_details__capacity_item}>
            <button
              className={`${style.product_details__capacity_button} ${capacity === productDetails.capacity ? `${style.selected}` : ''}`}
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
