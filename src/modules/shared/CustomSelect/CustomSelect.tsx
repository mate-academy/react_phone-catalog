// CustomSelect.tsx
import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.scss';
import iconDropdown from '../../../img/icons/icon-dropdown-grey.png';
import { Product } from '../../../types/Product';

type Props = {
  options: (string | number)[];
  onChange: (sortField: string | number) => Product[] | void;
};

export const CustomSelect: React.FC<Props> = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.customSelect} ref={selectRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.customSelect__button} ${isOpen ? styles.focus : ''}`}
      >
        <span className={styles.customSelect__selected}>{selected}</span>
        <img
          src={iconDropdown}
          className={`${styles.customSelect__icon} ${isOpen ? styles.rotated : ''}`}
        />
      </button>

      {isOpen && (
        <ul className={styles.customSelect__content}>
          {options.map(option => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
                onChange(option);
              }}
              className={styles.customSelect__option}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
