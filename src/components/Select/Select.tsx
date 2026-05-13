import { useState } from 'react';
import styles from './Select.module.scss';
import arrowDown from '../../items/arrow_down.png';

type Props = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export const Select = ({ label, options, value, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.filter}>
      <span>{label}</span>
      <div className={`${styles.select} ${isOpen ? styles.select_open : ''}`}>
        <button
          className={styles.select_trigger}
          onClick={() => setIsOpen(prev => !prev)}
        >
          {value}
          <img
            src={arrowDown}
            alt="arrow"
            className={`${styles.arrow} ${isOpen ? styles.arrow_up : ''}`}
          />
        </button>

        {isOpen && (
          <ul className={styles.dropdown}>
            {options.map(option => (
              <li
                key={option}
                className={`${styles.option} ${option === value ? styles.option_active : ''}`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
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
