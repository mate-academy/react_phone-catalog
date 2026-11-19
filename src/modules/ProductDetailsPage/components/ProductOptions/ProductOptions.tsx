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

const COLOR_HEX: Record<string, string> = {
  black: '#1f2020',
  blue: '#215e7c',
  coral: '#ff7f50',
  gold: '#f9e5c9',
  graphite: '#5c5b57',
  green: '#aee1cd',
  midnight: '#23262b',
  midnightgreen: '#004e3b',
  pink: '#f5c6d0',
  purple: '#d1cdda',
  red: '#ba0c2e',
  rosegold: '#e6c0b7',
  silver: '#e2e3e4',
  sierrablue: '#a7c1d9',
  skyblue: '#87ceeb',
  spacegray: '#4e4e4e',
  starlight: '#faf6f2',
  white: '#f8f9fa',
  yellow: '#ffe681',
};

const getColorHex = (color: string) => {
  const normalized = color.toLowerCase().replace(/[^a-z]/g, '');

  if (COLOR_HEX[normalized]) {
    return COLOR_HEX[normalized];
  }

  const key = Object.keys(COLOR_HEX).find(name => normalized.includes(name));

  return key ? COLOR_HEX[key] : '#d6d6d6';
};

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

  return (
    <div className={styles.options}>
      <fieldset className={styles.group}>
        <div className={styles.legendRow}>
          <legend className={styles.legend}>Available colors</legend>
          {productId && <span className={styles.idLabel}>ID: {productId}</span>}
        </div>
        <div className={styles.colors}>
          {colors.map(option => (
            <label
              key={option}
              className={styles.colorOption}
              title={option}
              aria-label={option}
            >
              <input
                type="radio"
                name="color"
                value={option}
                checked={color === option}
                onChange={() => onColorChange(option)}
                className={styles.visuallyHidden}
              />
              <span
                className={styles.swatch}
                style={{ backgroundColor: getColorHex(option) }}
              />
            </label>
          ))}
        </div>
      </fieldset>

      {capacities.length > 0 && (
        <fieldset className={styles.group}>
          <legend className={styles.legend}>Select capacity</legend>
          <div className={styles.capacities}>
            {capacities.map(option => (
              <label key={option} className={styles.capacityOption}>
                <input
                  type="radio"
                  name="capacity"
                  value={option}
                  checked={capacity === option}
                  onChange={() => onCapacityChange(option)}
                  className={styles.visuallyHidden}
                />
                <span className={styles.capacity}>{formatMemory(option)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
};
