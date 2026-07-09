import { getProductColor } from '../../features/constants/productColors';
import styles from './ProductOptions.module.scss';

type Props = {
  colors: string[];
  selectedColor: string;
  capacities: string[];
  selectedCapacity: string;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
};

export const ProductOptions: React.FC<Props> = ({
  colors,
  selectedColor,
  capacities,
  selectedCapacity,
  onColorChange,
  onCapacityChange,
}) => {
  return (
    <div className={styles.options}>
      <div className={styles.options__group}>
        <div className={styles.options__colors}>
          {colors.map(color => {
            const isChecked = selectedColor === color;

            return (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label
                key={color}
                className={styles.options__colorLabel}
                title={color}
              >
                <input
                  className={styles.options__radio}
                  type="radio"
                  name="color"
                  value={color}
                  checked={isChecked}
                  onChange={() => onColorChange(color)}
                />
                <span
                  style={{ backgroundColor: getProductColor(color) }}
                  className={styles.options__colorCircle}
                />
              </label>
            );
          })}
        </div>

        <div className={styles.options__divider} />

        <div className={styles.options__capacities}>
          {capacities.map(capacity => {
            const isChecked = selectedCapacity === capacity;

            return (
              <label key={capacity} className={styles.options__capacityLabel}>
                <input
                  className={styles.options__radio}
                  type="radio"
                  name="capacity"
                  value={capacity}
                  checked={isChecked}
                  onChange={() => onCapacityChange(capacity)}
                />
                <span className={styles.options__capacityValue}>
                  {capacity}
                </span>
              </label>
            );
          })}
        </div>

        <div className={styles.options__divider} />
      </div>
    </div>
  );
};
