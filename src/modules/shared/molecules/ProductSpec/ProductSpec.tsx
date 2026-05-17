import React, { memo } from 'react';
import styles from './ProductSpec.module.scss';
import { Typography } from '../../atoms/Typography';

type Props = {
  label: string;
  value: string;
};

const ProductSpecComponent: React.FC<Props> = ({ label, value }) => (
  <div className={styles.field}>
    <Typography
      variant="small"
      color="secondary"
      className={styles.field__label}
    >
      {label}
    </Typography>

    <Typography variant="small" className={styles.field__value}>
      {value}
    </Typography>
  </div>
);

export const ProductSpec = memo(ProductSpecComponent);
