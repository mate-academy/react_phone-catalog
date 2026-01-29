import cn from 'classnames';
import React from 'react';

interface CapacityAvailableProps {
  gadget: Gadget;
  onChange: (capacity: string) => void;
}

export const CapacityAvailable: React.FC<CapacityAvailableProps> = ({
  gadget,
  onChange,
}) => {
  return gadget?.capacityAvailable.map(capacity => {
    return (
      <button
        key={capacity}
        className={cn('productPage__capacityElem', {
          'productPage__capacityElem--active': gadget.capacity === capacity,
        })}
        onClick={() => onChange(capacity)}
      >
        <span>{capacity}</span>
      </button>
    );
  });
};
