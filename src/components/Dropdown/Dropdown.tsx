import { useState } from 'react';
import styles from './Dropdown.module.scss';

interface Props {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export const Dropdown = ({ id, label, options, value, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.dropdown}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <select
          value={value}
          name="dropdown"
          id={id}
          onChange={e => {
            onChange(e.target.value);
            setIsOpen(false);
          }}
          className={isOpen ? styles.selectionOpen : styles.selection}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
