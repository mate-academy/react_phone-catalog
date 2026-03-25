import React from 'react';
import style from './CapacityOptions.module.scss';
import { PathType, Product } from '../../../types/Types';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  product: Product;
};

export const CapacityOptions: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  const handleChangeCapacity = (capacity: string) => {
    const urlColorPart = product.color.toLowerCase().replace(/\s+/g, '-');
    const urlCapacityPart = capacity.toLowerCase();

    navigate(
      `/${PathType.PRODUCT}/${product.namespaceId}-${urlCapacityPart}-${urlColorPart}`,
    );
  };

  const modifyValueCapacity = (capacityValue: string): string => {
    const value = capacityValue.replace(/[A-Za-z]/g, '');
    const measurement = capacityValue.replace(/[0-9]/g, '').toUpperCase();

    return `${value} ${measurement}`;
  };

  return (
    <div className={style.capacity}>
      <span className={style.capacity__header}>Select capacity</span>

      <div className={style.capacity__bottomContainer}>
        {product.capacityAvailable.map(capacityValue => (
          <label
            key={capacityValue}
            className={classNames(style.capacity__label, {
              [style['capacity__label--active']]:
                capacityValue === product.capacity,
            })}
          >
            <input
              type="radio"
              checked={capacityValue === product.capacity}
              name={`${capacityValue}-${product.namespaceId}`}
              className={style.capacity__radio}
              onChange={() => handleChangeCapacity(capacityValue)}
            />
            {modifyValueCapacity(capacityValue)}
          </label>
        ))}
      </div>
    </div>
  );
};
