import React, { useEffect, useRef, useState } from 'react';
import styles from './DropDown.styles.module.scss';
import ArrowDown from '../../assets/icons/arrowDownGrey.svg?react';

type Option = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
};

export const DropDown: React.FC<Props> = ({
  label,
  value,
  options,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
    <div className={`${styles.dropdown} ${className ?? ''}`} ref={dropdownRef}>
      <span className={styles.label}>{label}</span>

      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {selectedOption?.label}
        <ArrowDown className={`${styles.arrow} ${isOpen ? styles.open : ''}`} />
      </button>
      {isOpen && (
        <ul className={styles.options}>
          {options.map(option => (
            <li key={option.value} className={styles.option}>
              <button
                type="button"
                className={styles.optionButton}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
