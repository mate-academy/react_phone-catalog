import React, { useState } from 'react';
import styles from './Dropdown.module.scss';

export interface DropdownOption {
  value: string;
  label: string;
}

interface Props {
  title: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
}

export const Dropdown: React.FC<Props> = ({
  title,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className={styles.dropdown}>
      <span className={styles.dropdown__title}>{title}</span>

      <div
        className={styles.dropdown__container}
        tabIndex={0}
        onBlur={() => setIsOpen(false)}
      >
        <button
          type="button"
          className={styles.dropdown__toggle}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption.label}
          <img
            src="/icons/arrow-down.svg"
            alt="arrow"
            className={`${styles.dropdown__arrow} ${isOpen ? styles['dropdown__arrow--up'] : ''}`}
          />
        </button>

        {isOpen && (
          <ul className={styles.dropdown__menu}>
            {options.map(option => (
              <li key={option.value} className={styles.dropdown__item}>
                <button
                  type="button"
                  className={styles.dropdown__btn}
                  onMouseDown={() => {
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
    </div>
  );
};
