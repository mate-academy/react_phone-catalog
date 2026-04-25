import { useState } from 'react';
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

  return (
    <div className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}

      <div className={styles.selectWrapper}>
        <select
          className={styles.select}
          value={value}
          onChange={event => onChange(event.target.value as T)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <img
          src="/img/icons/arrow-down.svg"
          alt=""
          className={`${styles.arrow}${isOpen ? ` ${styles.arrowOpen}` : ''}`}
        />
      </div>
    </div>
  );
};
