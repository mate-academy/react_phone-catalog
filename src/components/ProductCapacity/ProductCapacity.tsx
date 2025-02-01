import React from 'react';
import { ProductDetailsType } from '../../types/ProductDetailsType';
import style from './ProductCapacity.module.scss';

type Props = {
  productDetails: ProductDetailsType;
  onCapacityChange: (capacity: string) => void;
};

export const ProductCapacity: React.FC<Props> = ({
  onCapacityChange,
  productDetails,
}) => {
  return (
    <div className={style.product_details__capacity}>
      <p className={style.product_details__capacity_title}>Select Capacity</p>

      <ul className={style.product_details__capacity_list}>
        {productDetails.capacityAvailable.map(capacity => (
          <li key={capacity} className={style.product_details__capacity_item}>
            <button
              className={`${style.product_details__capacity_button} ${capacity === productDetails.capacity ? `${style.selected}` : ''}`}
              onClick={() => onCapacityChange(capacity)}
            >
              {capacity}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
