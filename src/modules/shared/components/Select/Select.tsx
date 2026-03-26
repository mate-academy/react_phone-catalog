import React from 'react';
import styles from './Select.module.scss';

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export const Select: React.FC<Props> = ({ id, label, value, onChange }) => {
  return (
    <div className={styles.control}>
      <label htmlFor={id} className={styles.controlLabel}>
        {label}
      </label>
      <select
        id={id}
        className={styles.controlSelect}
        value={value}
        onChange={event => onChange(event.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="alphabetically">Alphabetically</option>
        <option value="cheapest">Cheapest</option>
      </select>
    </div>
  );
};
