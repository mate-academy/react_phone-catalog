import { useState, useRef, useEffect } from 'react';
import styles from './Select.module.scss';

type Option<T> = {
  value: T;
  label: string;
};

type Props<T> = {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  customClass?: string;
};

export const Select = <T extends string | number>({
  label,
  value,
  options,
  onChange,
  customClass,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

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

  return (
    <div
      className={`${styles.select__container} ${customClass || ''}`}
      ref={dropdownRef}
    >
      <span className={styles.select__label}>{label}</span>

      <div
        className={`${styles.select__box} ${isOpen ? styles.select__box_open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.label : value}</span>
        <span
          className={`${styles.select__arrow} ${isOpen ? styles.select__arrow_up : ''}`}
        >
          <img
            src={`${import.meta.env.BASE_URL}img/icons/arrow-down-grey.svg`}
            alt="arrow"
            className={styles.select__icon}
          />
        </span>
      </div>

      {isOpen && (
        <ul className={styles.select__dropdown}>
          {options.map(opt => (
            <li
              key={String(opt.value)}
              className={`${styles.select__option} ${opt.value === value ? styles.select__option_selected : ''}`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
