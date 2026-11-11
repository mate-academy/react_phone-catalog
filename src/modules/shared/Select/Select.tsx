import { useState, useRef, useEffect } from 'react';
import styles from './Select.module.scss';

type Option = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  label: string;
};

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  options: Option[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
  placeholder?: string;
  label?: string;
  className?: string;
};

export const Select = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  label,
  className,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.select} ${className || ''}`} ref={ref}>
      {label && <div className={styles.select__label}>{label}</div>}
      <button
        className={`${styles.select__trigger} ${isOpen ? styles.select__trigger_open : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className={styles.select__value}>
          {selected ? selected.label : placeholder}
        </span>
        <span
          className={`${styles.select__arrow} ${isOpen ? styles.select__arrow_open : ''}`}
        />
      </button>

      {isOpen && (
        <ul className={styles.select__dropdown}>
          {options.map(option => (
            <li
              key={option.value}
              className={`${styles.select__option} ${option.value === value ? styles.select__option_active : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
