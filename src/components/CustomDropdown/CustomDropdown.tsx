import React, { useState, useEffect, useRef } from 'react';
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.label} smallText`}
      >
        {string}
      </div>
      <div
        className={`${styles.selected} buttons`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find(option => option.value === selected)?.label || 'Select'}
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {options.map(option => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`${option.value === selected ? styles.active : ''} bodyText`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
