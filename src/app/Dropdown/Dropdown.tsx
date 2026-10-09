import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.scss';

export interface DropdownOption {
  value: string;
  label: string;
}

interface Props {
  label?: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const Dropdown: React.FC<Props> = ({
  label,
  options,
  value,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

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

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={classNames(styles.container, className)} ref={dropdownRef}>
      {label && <span className={styles.label}>{label}</span>}

      <button
        type="button"
        className={classNames(styles.control, {
          [styles['control--open']]: isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption?.label}</span>
        <span
          className={classNames(styles.arrow, {
            [styles['arrow--up']]: isOpen,
          })}
        />
      </button>

      {isOpen && (
        <ul className={styles.menu}>
          {options.map(option => (
            <li
              key={option.value}
              className={classNames(styles.item, {
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
  );
};
