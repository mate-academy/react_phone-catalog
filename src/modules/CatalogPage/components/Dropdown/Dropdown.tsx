import React, { useState, useRef } from 'react';
import cn from 'classnames';
import ArrowDown from '@/assets/icons/ArrowDown.svg?react';
import styles from './Dropdown.module.scss';
import { useClickOutside } from '../../hooks/useClickOutside';


interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  variant?: 'sort' | 'perPage';
}

export const Dropdown: React.FC<Props> = ({
  label,
  options,
  value,
  onChange,
  variant = 'sort',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Zamykanie dropdowna po kliknięciu poza nim
  useClickOutside(dropdownRef, () => setIsOpen(false));

  // Znajdujemy etykietę dla aktualnie wybranej wartości
  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <span className={styles.label}>{label}</span>

      <div
        className={cn(styles.dropdown, {
          [styles['dropdown--perPage']]: variant === 'perPage',
        })}
      >
        <button
          type="button"
          className={cn(styles.button, { [styles['button--active']]: isOpen })}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={styles.buttonText}>
            {selectedOption?.label || value}
          </span>
          <ArrowDown
            className={cn(styles.icon, { [styles['icon--open']]: isOpen })}
          />
        </button>

        {isOpen && (
          <ul className={styles.list}>
            {options.map(option => (
              <li
                key={option.value}
                className={cn(styles.item, {
                  [styles['item--selected']]: option.value === value,
                })}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
