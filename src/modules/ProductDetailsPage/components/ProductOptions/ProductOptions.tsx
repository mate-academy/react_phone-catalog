import { Product } from '../../../../api/types';
import { formatMemory } from '../../../../shared/utils/format';
import styles from './ProductOptions.module.scss';

interface ProductOptionsProps {
  product: Product;
  color?: string;
  capacity?: string;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
}

export const ProductOptions = ({
  product,
  color,
  capacity,
  onColorChange,
  onCapacityChange,
}: ProductOptionsProps) => {
  const colors = product.colorsAvailable ?? [];
  const capacities = product.capacityAvailable ?? [];

  const renderGroup = (
    legend: string,
    options: string[],
    selected: string | undefined,
    onSelect: (value: string) => void,
  ) => (
    <fieldset className={styles.group}>
      <legend className={styles.legend}>{legend}</legend>
      {options.map(option => (
        <label key={option} className={styles.option}>
          <input
            type="radio"
            name={legend}
            value={option}
            checked={selected === option}
            onChange={() => onSelect(option)}
          />
          {formatMemory(option)}
        </label>
      ))}
    </fieldset>
  );

  return (
    <div className={styles.options}>
      {renderGroup('Color', colors, color, onColorChange)}
      {renderGroup('Capacity', capacities, capacity, onCapacityChange)}
    </div>
  );
};
