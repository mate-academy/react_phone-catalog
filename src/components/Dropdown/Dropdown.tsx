import React, { useState } from 'react';
import { ArrowRightIcon } from '@components/Icons/ArrowRightIcon';

import styles from './Dropdown.module.scss';

interface DropdownProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.dropdown}>
      <button
        className={`${styles.dropdown__button} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        <span className={styles.dropdown__arrow}>
          <ArrowRightIcon active={true} />
        </span>
      </button>
      {isOpen && (
        <ul className={styles.dropdown__list}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.dropdown__item}
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
  );
};
