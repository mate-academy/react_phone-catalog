import React from 'react';
import styles from './ColorRadioButton.module.scss';

interface Props {
  name: string;
  color: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export const ColorRadioButton: React.FC<Props> = ({
  color,
  checked,
  onChange,
  name,
}) => {
  return (
    <label className={styles.radio}>
      <input
        className={styles.realRadio}
        type="radio"
        name={name}
        value={color}
        checked={checked}
        onChange={() => onChange(color)}
      />
      <span className={styles.customRadio} style={{ color: color }}></span>
    </label>
  );
};
