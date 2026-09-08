import styles from './TechSpecs.module.scss';

import React from 'react';

export type Spec = {
  label: string;
  value: string | number;
};

type Props = {
  specs: Spec[];
};

export const TechSpecs: React.FC<Props> = ({ specs }) => {
  return (
    <div className={styles.techSpecs__list}>
      {specs.map(spec =>
        spec.value ? (
          <div key={spec.label} className={styles.techSpecs__item}>
            <span className={styles.techSpecs__label}>{spec.label}</span>
            <span className={styles.techSpecs__value}>{spec.value}</span>
          </div>
        ) : null,
      )}
    </div>
  );
};
