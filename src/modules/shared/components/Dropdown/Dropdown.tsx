/* eslint-disable prettier/prettier */
import { useState, useRef, useEffect } from 'react';
import { getImg } from '../../../../utils/getImageUrl';
import styles from './Dropdown.module.scss';

type Option = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  width?: number;
};

export const Dropdown = ({ label, options, value, onChange, width }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find(o => o.value === value)?.label || '';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      <p className={styles.label}>{label}</p>
      <div
        className={`${styles.select} ${isOpen ? styles.selectOpen : ''}`}
        style={{ width: width ? `${width}px` : undefined }}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className={styles.selected}>{selectedLabel}</span>
        <img
          src={isOpen
            ? getImg('img/icons/arrow-up.svg')
            : getImg('img/icons/arrow-down.svg')
          }
          alt="arrow"
          className={styles.arrow}
        />
      </div>

      {isOpen && (
        <ul
          className={styles.dropdown}
          style={{ width: width ? `${width}px` : undefined }}
        >
          {options.map(option => (
            <li
              key={option.value}
              className={`${styles.option} ${option.value === value ? styles.optionActive : ''}`}
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
