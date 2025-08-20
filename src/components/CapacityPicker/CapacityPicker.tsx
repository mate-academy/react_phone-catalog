import React, { useEffect, useState } from 'react';
import './CapacityPicker.scss';

type Props = {
  activeCapacity?: string;
  capacity: string[] | string;
};

export const CapacityPicker: React.FC<Props> = ({
  activeCapacity,
  capacity,
}) => {
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(
    activeCapacity || null,
  );
  const capacityArray = typeof capacity === 'string' ? [capacity] : capacity;

  useEffect(() => {
    if (activeCapacity) {
      setSelectedCapacity(activeCapacity);
    }
  }, [activeCapacity]);

  return (
    <div className="capacity-picker">
      {capacityArray.map(item => (
        <label
          key={item}
          className={`capacity-picker__container ${
            selectedCapacity === item
              ? 'capacity-picker__container--selected'
              : ''
          }`}
        >
          <input
            type="radio"
            name="capacity"
            value={item}
            checked={selectedCapacity === item}
            onChange={() => setSelectedCapacity(item)}
            className="capacity-picker__radio"
          />
          <span className="capacity-picker__text">
            {item.replace(/(\d+)(GB)/, '$1 $2')}
          </span>
        </label>
      ))}
    </div>
  );
};
