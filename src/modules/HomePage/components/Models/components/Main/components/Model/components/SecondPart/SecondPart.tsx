import React from 'react';

import { Spec } from '../../../../../../enums/Spec';
import styles from './SecondPart.module.scss';

interface Props {
  spec: string[];
}

export const SecondPart: React.FC<Props> = React.memo(({ spec }) => {
  return (
    <div className={styles['second-part']}>
      {Object.values(Spec).map((value, index) => {
        return (
          <div className={styles.spec} key={value}>
            <div className={styles['spec-title']}>{value}</div>

            <div className={styles['spec-value']}>{spec[index]}</div>
          </div>
        );
      })}
    </div>
  );
});

SecondPart.displayName = 'SecondPart';
