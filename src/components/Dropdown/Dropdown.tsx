import React, { useState } from 'react';
import styles from './Dropdown.module.scss';

export const Dropdown: React.FC<{ label: string; options: string[] }> = ({
  label,
  options,
  handleSort,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.dropdown}>
      <label className={styles.label}>{label}</label>
      <select
        className={styles.select}
        onChange={event => handleSort(event.target.value)}
        onBlur={() => setIsOpen(false)}
      >
        {options.map((option, index) => (
          <option className={styles.option} key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div
        className={`${styles.arrow} ${isOpen ? styles['arrow--open'] : ''}`}
      ></div>
    </div>
  );
};
