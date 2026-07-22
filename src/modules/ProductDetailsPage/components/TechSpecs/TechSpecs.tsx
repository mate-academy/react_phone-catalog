import React from 'react';
import styles from './TechSpecs.module.scss';
import { Typography } from '@shared/ui/Typography';
import { Divider } from '@shared/ui/Divider';
import { getFullSpecs } from '@shared/utils/getFullSpecs';

type Props = {
  fullSpecs: ReturnType<typeof getFullSpecs>;
};

export const TechSpecs: React.FC<Props> = ({ fullSpecs }) => (
  <div className={styles.techSpecs}>
    <Typography variant="h3">Tech specs</Typography>

    <Divider />

    <div className={styles.techSpecsProduct}>
      {fullSpecs.map(
        spec =>
          spec.value && (
            <div key={spec.label} className={styles.techSpecsCard}>
              <span className={styles.techSpecsTitle}>{spec.label}</span>
              <span className={styles.techSpecsValue}>{spec.value}</span>
            </div>
          ),
      )}
    </div>
  </div>
);
