import type React from 'react';
import type { Product } from '../../../../types/Product';
import styles from './Specifications.module.scss';

type Props = {
  product: Product;
  list: readonly (keyof Product)[];
  classnames?: {
    specificationsPanel?: string;
    specifications?: string;
  };
  title?: string;
};

export const Specifications: React.FC<Props> = ({
  list,
  product,
  classnames,
  title,
}) => {
  return (
    <div
      className={`${styles['specifications-panel']} ${classnames?.specificationsPanel}`}
    >
      {title && (
        <>
          <h3>{title}</h3>
          <div className={styles.divider}></div>
        </>
      )}
      <div className={`${styles.specifications} ${classnames?.specifications}`}>
        {list.map(spec => {
          const rawValue = product[spec];
          let displayValue: React.ReactNode = null;

          if (spec === 'screen' && typeof rawValue === 'string') {
            displayValue = rawValue.replace(/\s*\(.*?\)/g, '').trim();
          } else if (Array.isArray(rawValue)) {
            displayValue = rawValue.join(', ');
          } else if (
            typeof rawValue === 'string' ||
            typeof rawValue === 'number'
          ) {
            displayValue = rawValue;
          }

          return (
            <div className={styles['specification-row']} key={spec}>
              <span className={styles['specification-label']}>{spec}</span>
              <span className={styles['specification-value']}>
                {displayValue}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
