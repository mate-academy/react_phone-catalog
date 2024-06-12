import React from 'react';
import styles from './Dropdown.module.scss';

type Option = {
  value: string;
  label: string;
};

interface Props {
  label: string;
  options: Option[];
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<Props> = ({ label, options, value, onChange }) => {
  return (
    <label className={styles.label}>
      {label}

      <select value={value} onChange={onChange} className={styles.select}>
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
            className={styles.option}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
