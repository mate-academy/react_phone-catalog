import classNames from 'classnames';
import React from 'react';
import styles from './TechSpecs.module.scss';

interface SpecItem {
  label: string;
  value: string | string[] | number | undefined;
}

interface Props {
  specs: SpecItem[];
  type?: 'short' | 'full';
}

export const TechSpecs: React.FC<Props> = ({ specs, type = 'full' }) => {
  return (
    <div
      role="table"
      className={classNames(styles.techSpecs, styles[`techSpecs--${type}`])}
    >
      {specs.map(({ label, value }) => (
        <div key={label} role="row" className={styles.techSpecs__row}>
          <span role="rowheader" className={styles.techSpecs__label}>
            {label}
          </span>
          <span role="cell" className={styles.techSpecs__value}>
            {Array.isArray(value) ? value.join(', ') : value || '-'}
          </span>
        </div>
      ))}
    </div>
  );
};
