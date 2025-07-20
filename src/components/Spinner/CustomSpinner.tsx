import { type FC } from 'react';
import styles from './CustomSpinner.module.scss';

interface CustomSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary';
  label?: string;
}

export const CustomSpinner: FC<CustomSpinnerProps> = ({
  size = 'lg',
  color = 'primary',
  label,
}) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]} ${styles[color]}`} />
      {label && <div className={styles.label}>{label}</div>}
    </div>
  );
};
