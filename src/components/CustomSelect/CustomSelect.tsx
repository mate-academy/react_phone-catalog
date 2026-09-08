import React, { useState, useRef, useEffect } from 'react';

import ArrowDown from '../../assets/icons/catalogIcons/ArrowDown.svg';
import ArrowUp from '../../assets/icons/catalogIcons/ArrowUp.svg';
import styles from './CustomSelect.module.scss';

type Option = {
  value: string;
  label: string;
};

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.select} ref={ref}>
      <button
        type="button"
        className={styles.select__trigger}
        onClick={() => setOpen(prev => !prev)}
      >
        <h3 className={styles.select__active_value}>{value}</h3>
        <img
          src={open ? ArrowUp : ArrowDown}
          alt="Arrow Down"
          className={styles.select__arrow}
        />
      </button>
      {open && (
        <ul className={styles.select__items}>
          {options.map(option => (
            <li
              key={option.value}
              className={styles.select__item}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
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
