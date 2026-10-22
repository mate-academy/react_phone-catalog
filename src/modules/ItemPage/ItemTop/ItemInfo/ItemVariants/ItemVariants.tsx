import React from 'react';
import classNames from 'classnames';

import styles from './ItemVariants.module.scss';
import { COLOR_MAP } from '../../../../../shared/constants/colors';

import { ProductDetails } from '../../../../../types/ProductDetails';

interface Props {
  product: ProductDetails;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
}

export const ItemVariants: React.FC<Props> = ({
  product,
  onColorChange,
  onCapacityChange,
}) => {
  const { colorsAvailable, capacityAvailable, color, capacity } = product;

  return (
    <div className={styles.variants}>
      {/* COLORS */}
      {colorsAvailable?.length > 0 && (
        <div className={styles.colorsSection}>
          <h3 className={styles.label}>Available colors</h3>

          <div className={styles.colors} role="radiogroup">
            {colorsAvailable.map(c => (
              <button
                key={c}
                type="button"
                role="radio"
                aria-pressed={c === color}
                aria-label={`Select ${c}`}
                title={c}
                className={classNames(styles.colorCircle, {
                  [styles.active]: c === color,
                })}
                style={{ backgroundColor: COLOR_MAP[c] }}
                onClick={() => {
                  if (c !== color) {
                    onColorChange(c);
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* CAPACITIES */}
      {capacityAvailable?.length > 0 && (
        <div className={styles.capacitySection}>
          <h3 className={styles.label}>Select capacity</h3>

          <div className={styles.capacity} role="radiogroup">
            {capacityAvailable.map(cap => (
              <button
                key={cap}
                type="button"
                role="radio"
                aria-pressed={cap === capacity}
                className={classNames(styles.capacityButton, {
                  [styles.active]: cap === capacity,
                })}
                onClick={() => {
                  if (cap !== capacity) {
                    onCapacityChange(cap);
                  }
                }}
              >
                {cap}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
