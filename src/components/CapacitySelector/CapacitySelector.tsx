import { useMemo } from 'react';

import { Item } from '../../types/Item';

import styles from './CapacitySelector.module.scss';
const {
  capacity__content,
  capacity__title,
  capacity__options,
  capacity__option,
  capacity__line,
  isActive,
} = styles;

type CapacitySelectorProps = {
  item: Item;
  capacityOptions: string[];
  onCapacityChange: (newItemId: string) => void;
  itemOptions: Item[];
};

export const CapacitySelector = ({
  item,
  capacityOptions,
  onCapacityChange,
  itemOptions,
}: CapacitySelectorProps) => {
  const handleCapacityChange = (capacity: string) => {
    if (capacity === item.capacity) return;

    const newItem = itemOptions.find(
      (option) =>
        option.namespaceId === item.namespaceId &&
        option.color === item.color &&
        option.capacity === capacity,
    );
    if (newItem) {
      onCapacityChange(newItem.id);
    }
  };

  const capacityButtons = useMemo(
    () =>
      capacityOptions.map((capacity, index) => (
        <button
          key={index}
          onClick={() => handleCapacityChange(capacity)}
          className={`${capacity__option} ${item.capacity === capacity ? isActive : ''}`}
          disabled={item.capacity === capacity}
        >
          {capacity}
        </button>
      )),
    [capacityOptions, item.capacity],
  );

  return (
    <div>
      <div className={capacity__content}>
        <h3 className={capacity__title}>Select capacity</h3>
        <div className={capacity__options}>{capacityButtons}</div>
      </div>

      <div className={capacity__line}></div>
    </div>
  );
};
