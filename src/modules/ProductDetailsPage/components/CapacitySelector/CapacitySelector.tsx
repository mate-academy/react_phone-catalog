import { useContext, useState } from 'react';
import styles from './CapatitySelector.module.scss';
import cn from 'classnames';
import { ProductDetailsContext } from 'store/ProductDetailsContext';

export const CapacitySelector = () => {
  const { product } = useContext(ProductDetailsContext);

  const formatText = (text: string) => {
    const prefix = text.slice(0, -2);
    const suffix = text.slice(-2);

    return `${prefix} ${suffix}`;
  };

  const [selectedCapacity, setSelectedCapacity] = useState(
    product ? formatText(product.capacity) : '',
  );

  if (!product) {
    return;
  }

  const formattedList = product.capacityAvailable.map(capacity => {
    return formatText(capacity);
  });

  const handleOnCapacityChange = (capacity: string) => {
    setSelectedCapacity(capacity);
  };

  return (
    <div className={styles.container}>
      <span className={styles.container__label}>Select capacity</span>
      <div className={styles.container__items}>
        {formattedList.map(capacity => (
          <div
            key={capacity}
            className={cn(styles.container__items__item, {
              [styles.container__items__item__active]:
                selectedCapacity === capacity,
            })}
            onClick={() => handleOnCapacityChange(capacity)}
          >
            <span>{capacity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
