import React, { useState, useRef, useEffect } from 'react';
import styles from './DropdownSelect.module.scss';
import { asset } from '../../../../helper';

type Props = {
  options: (string | number)[];
  label?: string;
  className?: string;
  value?: string | number | null;
  onChange?: (value: string | number) => void;
};

export const DropdownSelect: React.FC<Props> = ({
  options = [],
  label = '',
  className = '',
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = value ? value : options[0];

  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleSelect = (option: string | number) => {
    onChange?.(option);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.container} ${className}`} ref={dropdownRef}>
      {label && <span className={styles.label}>{label}</span>}

      <div className={styles.wrapper}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`${styles.button} ${isOpen ? styles.open : ''}`}
        >
          <span>{selected}</span>
          <img
            src={asset('img/arrow-secondary.svg')}
            className={`${styles.icon} ${isOpen ? styles.rotate : ''}`}
            alt="Arrow"
          />
        </button>

        {isOpen && (
          <ul className={styles.options}>
            {options.map(option => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className={`${styles.option} ${selected === option ? styles.selected : ''}`}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
