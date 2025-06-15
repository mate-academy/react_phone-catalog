import React from 'react';
import styles from './ProductOptions.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type CapacitySelectorProps = {
  capacityAvailable: string[];
  normalizedCurrentColor: string;
  namespaceId: string;
  capacity: string;
  category: string;
};

export const CapacitySelector: React.FC<CapacitySelectorProps> = ({
  capacityAvailable,
  normalizedCurrentColor,
  namespaceId,
  capacity,
  category,
}) => {
  return (
    <div className={styles.productOptions__sizesWrapper}>
      <div className={styles.productOptions__title}>
        <span>Available capacity</span>
      </div>

      <ul className={styles.productOptions__sizes}>
        {capacityAvailable.map(capacityItem => {
          const url = `/${category}/${namespaceId}-${capacityItem.toLowerCase()}-${normalizedCurrentColor}`;

          return (
            <li
              key={capacityItem}
              className={classNames(
                styles.productOptions__sizeItem,
                capacity === capacityItem &&
                  styles['productOptions__size--active'],
              )}
            >
              <Link to={url}>
                <span className={styles.productOptions__size}>
                  {capacityItem}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
