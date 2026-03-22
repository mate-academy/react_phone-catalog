import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './ProductConfig.module.scss';
import { ProductDetails } from '../../../../types/ProductDetails';
import { useProductConfig } from './useProductConfig';

interface Props {
  product: ProductDetails;
}

export const ProductConfig: React.FC<Props> = ({ product }) => {
  const { colorsAvailable, color, capacityAvailable, capacity } = product;
  const { getProductLink, getColorHex } = useProductConfig(product);

  return (
    <div className={styles.config}>
      <div className={styles.section}>
        <div className={styles.labelRow}>
          <p className={styles.label}>Available colors</p>
        </div>

        <div className={styles.colors}>
          {colorsAvailable.map(c => (
            <Link
              key={c}
              to={getProductLink(capacity, c)}
              title={c}
              aria-label={`Select ${c} color`}
              className={classNames(styles.colorCircle, {
                [styles.activeColor]: c === color,
              })}
            >
              <span style={{ backgroundColor: getColorHex(c) }} />
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <p className={styles.label}>Select capacity</p>

        <div className={styles.capacities}>
          {capacityAvailable.map(cap => (
            <Link
              key={cap}
              to={getProductLink(cap, color)}
              className={classNames(styles.capacityBtn, {
                [styles.activeCapacity]: cap === capacity,
              })}
            >
              {cap}
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.divider} />
    </div>
  );
};
