import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.scss';

type Option = {
  value: string;
  label: string;
};

type Props = {
  label: string; // Np. "Sort by"
  value: string; // Aktualnie wybrana wartość
  options: Option[]; // Lista opcji
  onChange: (value: string) => void;
};

export const Dropdown: React.FC<Props> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Znajdź etykietę aktualnie wybranej opcji
  const selectedLabel = options.find(opt => opt.value === value)?.label;

  const handleSelect = (newValue: string) => {
    onChange(newValue);
    setIsOpen(false);
  };

  // Zamykanie menu po kliknięciu poza nie
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
    <div className={styles.container} ref={dropdownRef}>
      <span className={styles.label}>{label}</span>

      <div className={styles.dropdownWrapper}>
        {/* Przycisk otwierający */}
        <button
          type="button"
          className={classNames(styles.trigger, { [styles.active]: isOpen })}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedLabel || 'Select...'}
          <span className={classNames(styles.arrow, { [styles.up]: isOpen })} />
        </button>

        {/* Lista opcji */}
        {isOpen && (
          <ul className={styles.menu}>
            {options.map(option => (
              <li
                key={option.value}
                className={classNames(styles.option, {
                  [styles.selected]: option.value === value,
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
