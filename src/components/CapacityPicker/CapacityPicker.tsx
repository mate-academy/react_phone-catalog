import React, { useState } from 'react';
import './CapacityPicker.scss';

type Props = {
  capacity: string[] | string;
};

export const CapacityPicker: React.FC<Props> = ({ capacity }) => {
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);

  const capacityArray = typeof capacity === 'string' ? [capacity] : capacity;

  return (
    <div className="capacity-picker">
      {capacityArray.map(item => (
        <div
          key={item}
          className={`capacity-picker__container ${
            selectedCapacity === item
              ? 'capacity-picker__container--selected'
              : ''
          }`}
          onClick={() => setSelectedCapacity(item)}
        >
          <span className="capacity-picker__text">
            {item.replace(/(\d+)(GB)/, '$1 $2')}
          </span>
        </div>
      ))}
    </div>
  );
};
