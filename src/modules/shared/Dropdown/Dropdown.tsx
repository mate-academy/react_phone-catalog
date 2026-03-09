import React from 'react';
import styles from './Dropdown.module.scss';

type Props = {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

export const Dropdown: React.FC<Props> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <select
        className={styles.select}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
