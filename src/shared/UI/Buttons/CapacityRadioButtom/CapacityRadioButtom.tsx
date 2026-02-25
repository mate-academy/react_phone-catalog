import React from 'react';
import styles from './CapacityRadioButtom.module.scss';

interface Props {
  name: string;
  capacity: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export const CapacityRadioButtom: React.FC<Props> = ({
  capacity,
  name,
  checked,
  onChange,
}) => {
  return (
    <label className={styles.radio}>
      <input
        type="radio"
        className={styles.realRadio}
        name={name}
        checked={checked}
        value={capacity}
        onChange={() => onChange(capacity)}
      />
      <span className={styles.customRadio}>{capacity}</span>
    </label>
  );
};
