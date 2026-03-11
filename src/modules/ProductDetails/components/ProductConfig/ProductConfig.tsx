import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductConfig.module.scss';
import { ProductDetails } from '../../../../types/ProductDetails';

const COLOR_MAP: Record<string, string> = {
  black: '#1F2020',
  red: '#BA0C2E',
  green: '#ABE7E0',
  yellow: '#FFE681',
  purple: '#D1CDDA',
  white: '#F9F6F2',
  gold: '#F9E5C9',
  silver: '#E2E4E1',
  spacegray: '#535150',
  midnightgreen: '#4E5851',
  rosegold: '#EAD1BB',
  coral: '#EE7762',
};

interface Props {
  product: ProductDetails;
}

export const ProductConfig: React.FC<Props> = ({ product }) => {
  const { namespaceId, colorsAvailable, color, capacityAvailable, capacity } =
    product;

  const getProductLink = (newCapacity: string, newColor: string) => {
    const formattedCapacity = newCapacity.toLowerCase().replace(/\s+/g, '');

    const formattedColor = newColor.toLowerCase().replace(/\s+/g, '-');

    return `/product/${namespaceId}-${formattedCapacity}-${formattedColor}`;
  };

  return (
    <div className={styles.config}>
      <div className={styles.section}>
        <p className={styles.label}>Available colors</p>
        <div className={styles.colors}>
          {colorsAvailable.map(c => {
            const colorKey = c.toLowerCase().replace(/\s+/g, '');

            return (
              <Link
                key={c}
                to={getProductLink(capacity, c)}
                className={`${styles.colorCircle} ${c === color ? styles.activeColor : ''}`}
              >
                <span style={{ backgroundColor: COLOR_MAP[colorKey] || c }} />
              </Link>
            );
          })}
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
              className={`${styles.capacityBtn} ${cap === capacity ? styles.activeCapacity : ''}`}
            >
              {cap}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
