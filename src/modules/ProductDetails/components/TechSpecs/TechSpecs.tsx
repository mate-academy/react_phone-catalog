import React from 'react';

import styles from './TechSpecs.module.scss';
import { ProductDetailsType } from '../../../../types/product-details.types';
import classNames from 'classnames';

const techSpecsLabels: Record<string, string> = {
  screen: 'Screen',
  resolution: 'Resolution',
  processor: 'Processor',
  ram: 'RAM',
  capacity: 'Built in memory',
  camera: 'Camera',
  zoom: 'Zoom',
  cell: 'Cell',
};

const specsToShow = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'capacity',
  'camera',
  'zoom',
  'cell',
];

// prettier-ignore
interface TechSpecsProps {
  details: Partial<
  Pick<
  ProductDetailsType,
  | 'screen'
  | 'resolution'
  | 'processor'
  | 'ram'
  | 'capacity'
  | 'camera'
  | 'zoom'
  | 'cell'
  >
  >;
  className: string;
}

export const TechSpecs: React.FC<TechSpecsProps> = ({ details, className }) => {
  return (
    <div className={classNames(styles.techSpecsBlock, className)}>
      <h3 className={styles.sectionTitle}>Tech specs</h3>
      <div className={styles.separator} />
      <div className={styles.techSpecs}>
        {specsToShow.map(key => {
          const value = details[key as keyof typeof details];

          if (!value || (Array.isArray(value) && value.length === 0)) {
            return null;
          }

          return (
            <div key={key} className={styles.specRow}>
              <span className={styles.label}>{techSpecsLabels[key]}: </span>
              <span className={styles.value}>
                {Array.isArray(value) ? value.join(', ') : value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
