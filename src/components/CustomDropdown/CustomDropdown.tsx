import React, { useState } from 'react';
import styles from './CustomDropdown.module.scss';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
  string: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selected,
  onChange,
  string,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.label} smallText`}
      >
        {string}
      </div>
      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        {options.find(option => option.value === selected)?.label || 'Select'}
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {options.map(option => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={option.value === selected ? styles.active : ''}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
