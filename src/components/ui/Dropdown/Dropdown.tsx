import React, { useCallback, useRef, useState } from 'react';
import styles from './Dropdown.module.scss';
import { ArrowDownIcon } from '../ArrowDownIcon';
import { ArrowUpIcon } from '../ArrowUpIcon';
import { useClickOutside } from '../../../hooks/useClickOutside';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  label,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  useClickOutside(dropdownRef, closeDropdown);

  const selectedOption =
    options.find(option => option.value === value) || options[0];

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.container} ${className}`} ref={dropdownRef}>
      {label && <span className={styles.container__label}>{label}</span>}

      <div className={styles.container__dropdown}>
        <button
          type="button"
          className={styles.container__trigger}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={styles.container__value}>
            {selectedOption.label}
          </span>
          <span className={styles.container__icon}>
            {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </span>
        </button>

        <ul
          className={`
            ${styles.container__list}
            ${isOpen ? styles.container__listVisible : ''}
          `}
          role="listbox"
        >
          {options.map(option => (
            <li
              key={option.value}
              className={`
                  ${styles.container__item}
                  ${option.value === value ? styles.container__itemActive : ''}
                `}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
