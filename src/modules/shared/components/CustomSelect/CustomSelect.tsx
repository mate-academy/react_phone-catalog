import React, { useState } from 'react';
import styles from './CustomSelect.module.scss';
import { ArrowIconDown } from '../../icons/ArrowIcon/ArrowIcon';

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  selected: string | undefined;
  onSelect: (e: string) => void;
};

export const CustomSelect: React.FC<Props> = ({
  options,
  selected,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.select}>
      <button
        className={`${styles.button} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        <ArrowIconDown />
      </button>
      <ul className={`${styles.select__options} ${isOpen ? styles.open : ''}`}>
        {options.map(option => (
          <li
            key={option.value}
            className={styles.select__option}
            onClick={() => {
              onSelect(option.value);
              setIsOpen(false);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelect;
