import cn from 'classnames';
import { getColorHex } from '../../utils/colors';
import styles from './ProductOptions.module.scss';

type ProductOptionsProps = {
  colorsAvailable: string[];
  capacityAvailable: string[];
  color: string;
  capacity: string;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
};

export const ProductOptions = ({
  colorsAvailable,
  capacityAvailable,
  color,
  capacity,
  onColorChange,
  onCapacityChange,
}: ProductOptionsProps) => {
  return (
    <div className={styles.options}>
      <span className={styles.optionLabel}>Available colors</span>

      <ul className={styles.colors}>
        {colorsAvailable.map(productColor => (
          <li key={productColor}>
            <button
              type="button"
              className={cn(styles.color, {
                [styles.colorActive]: color === productColor,
              })}
              aria-label={`Color ${productColor}`}
              aria-pressed={color === productColor}
              onClick={() => {
                if (productColor !== color) {
                  onColorChange(productColor);
                }
              }}
            >
              <span
                className={styles.colorInner}
                style={{ backgroundColor: getColorHex(productColor) }}
              />
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.divider} />

      <span className={styles.optionLabel}>Select capacity</span>

      <ul className={styles.capacities}>
        {capacityAvailable.map(productCapacity => (
          <li key={productCapacity}>
            <button
              type="button"
              className={cn(styles.capacity, {
                [styles.capacityActive]: capacity === productCapacity,
              })}
              aria-pressed={capacity === productCapacity}
              onClick={() => {
                if (capacity !== productCapacity) {
                  onCapacityChange(productCapacity);
                }
              }}
            >
              {productCapacity}
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.divider} />
    </div>
  );
};
