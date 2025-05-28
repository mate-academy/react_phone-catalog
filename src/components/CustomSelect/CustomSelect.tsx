import React, { useState, useRef, useEffect } from 'react';
import styles from '../CustomSelect/CustopmSelectStyles.module.scss';

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export const CustomSelect: React.FC<Props> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.selectWrapper} ref={selectRef}>
      <div className={styles.selected} onClick={() => setIsOpen(prev => !prev)}>
        {selectedOption?.label}
        <span className={styles.arrow}>
          <img src="/react_phone-catalog/img/icons/Stroke.svg" />
        </span>
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {options.map(option => (
            <li
              key={option.value}
              className={styles.option}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
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
