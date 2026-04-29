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

  const selectedOption = options.find(o => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
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
          className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span className={styles.triggerLabel}>{selectedOption?.label}</span>
          <img
            className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
            src="/img/icons/arrow-down.svg"
            alt="Toggle dropdown"
          />
        </button>

        {isOpen && (
          <ul role="listbox" className={styles.optionsMenu} aria-label={label}>
            {options.map(option => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
              >
                <button
                  type="button"
                  className={`${styles.option} ${option.value === value ? styles.optionSelected : ''}`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
