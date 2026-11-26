import React, { useEffect, useRef, useState } from 'react';
import styles from './Select.module.scss';

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
}

export const Select: React.FC<Props> = ({
  label,
  value,
  options,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    options.find(option => option.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={`${styles.select} ${className}`} ref={rootRef}>
      <span className={styles.select__label}>{label}</span>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`${styles.select__control} ${isOpen ? styles.select__controlOpen : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span>{selectedOption?.label}</span>
        <span
          className={`${styles.select__arrow} ${isOpen ? styles.select__arrowOpen : ''}`}
        />
      </button>

      {isOpen && (
        <ul className={styles.select__menu}>
          {options.map(option => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              tabIndex={0}
              className={`${styles.select__option} ${
                option.value === value ? styles.select__optionSelected : ''
              }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  onChange(option.value);
                  setIsOpen(false);
                }
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
