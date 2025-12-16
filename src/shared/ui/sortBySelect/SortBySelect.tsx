import React, { useState } from 'react';
import { SortOption } from '../../types/SortOption';
import styles from './SortBySelect.module.scss';

type Props = {
  value: SortOption;
  onChange: (value: SortOption) => void; // повертаємо оновлене value
};

const options: { value: SortOption; label: string }[] = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

export const SortBySelect: React.FC<Props> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.sortByBlock}>
      <p className={`small-text ${styles.specsTitle}`}>Sort by</p>
      <div className={styles.selectWrapper}>
        <div
          className={styles.sortSelect}
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span className={`button-text ${styles.value}`}>
            {options.find(opt => opt.value === value)?.label}
          </span>
          <img
            src={`img/icons/arrowDown.svg`}
            alt="arrow"
            className={isOpen ? styles.arrowOpen : styles.arrow}
          />
        </div>

        {isOpen && (
          <ul className={styles.dropdown}>
            {options.map(option => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={styles.listItem}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
