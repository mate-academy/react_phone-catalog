import React from 'react';
import styles from './Dropdown.module.scss';

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export const Dropdown: React.FC<Props> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={styles.select}
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
