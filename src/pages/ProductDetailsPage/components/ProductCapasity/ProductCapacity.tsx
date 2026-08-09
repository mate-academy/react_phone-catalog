import React from 'react';
import style from './ProductCapacity.module.scss';

type Props = {
  capacities: string[];
  selectedCapacity: string | null;
  onChange: (capacity: string) => void;
};

export const ProductCapacity: React.FC<Props> = ({
  capacities,
  selectedCapacity,
  onChange,
}) => {
  return (
    <div className={style.capacity}>
      <h3 className={style.titleH}>Select capacity</h3>

      <div className={style.wrapperCapacity}>
        {capacities.map(cap => (
          <label
            key={cap}
            className={`${style.blockCpacity} ${
              selectedCapacity === cap ? style.blockCpacityActive : ''
            }`}
          >
            <input
              type="radio"
              name="capacity"
              checked={selectedCapacity === cap}
              onChange={() => onChange(cap)}
              className={style.input}
            />
            <span
              className={`${style.capacityRadio} ${
                selectedCapacity === cap ? style.capacityRadioActive : ''
              }`}
            >
              {cap}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
