import { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.scss';

type Option<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  label?: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

export const Dropdown = <T extends string>({
  label,
  options,
  value,
  onChange,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

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

  const handleSelect = (optionValue: T) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      {label && <span className={styles.label}>{label}</span>}

      <div className={styles.selectWrapper}>
        <button
          type="button"
          className={`${styles.select}${isOpen ? ` ${styles.selectOpen}` : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption?.label}
        </button>

        <img
          src="/img/icons/arrow-down.svg"
          alt=""
          className={`${styles.arrow}${isOpen ? ` ${styles.arrowOpen}` : ''}`}
        />

        {isOpen && (
          <div className={styles.optionsMenu}>
            {options.map(option => (
              <button
                key={option.value}
                type="button"
                className={`${styles.option}${option.value === value ? ` ${styles.optionSelected}` : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
