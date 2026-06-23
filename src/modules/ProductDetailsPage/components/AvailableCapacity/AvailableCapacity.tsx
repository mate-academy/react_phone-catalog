import React from 'react';
import style from './AvailableCapacity.module.scss';
import cn from 'classnames';
import { ProductDetails } from '../../../../types/ProductDetails';
import { OutlineBottom } from '../OutlineBottom';

type Props = {
  product: ProductDetails;
  handleVariable: (capacity: string, num?: string) => void;
};

export const AvailableCapacity: React.FC<Props> = ({
  product,
  handleVariable,
}) => {
  return (
    <div className={style.capacityAvailable}>
      <p className={style.capacityAvailable__text}>Select capacity</p>
      <div className={style.capacities}>
        {product.capacityAvailable.map(capacity => (
          <div
            key={capacity}
            className={cn(style.capacity, {
              [style['capacity--active']]: capacity === product.capacity,
            })}
            onClick={() => handleVariable('', capacity)}
          >
            {capacity}
          </div>
        ))}
      </div>
      <OutlineBottom />
    </div>
  );
};
