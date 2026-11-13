import { Product } from '../../../../api/types';
import { formatMemory } from '../../../../shared/utils/format';
import styles from './ProductOptions.module.scss';

interface ProductOptionsProps {
  product: Product;
  productId?: string;
  color?: string;
  capacity?: string;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
}

export const ProductOptions = ({
  product,
  productId,
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
    idLabel?: string,
  ) => (
    <fieldset className={styles.group}>
      <div className={styles.legendRow}>
        <legend className={styles.legend}>{legend}</legend>
        {idLabel && <span className={styles.idLabel}>{idLabel}</span>}
      </div>
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
      {renderGroup(
        'Available colors',
        colors,
        color,
        onColorChange,
        productId ? `ID: ${productId}` : undefined,
      )}
      {renderGroup('Select capacity', capacities, capacity, onCapacityChange)}
    </div>
  );
};
