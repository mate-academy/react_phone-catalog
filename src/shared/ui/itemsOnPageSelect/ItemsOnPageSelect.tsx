import React, { useState } from 'react';
import styles from './ItemsOnPageSelect.module.scss';
import { PerPage } from '../../types/PerPage';

type Props = {
  value: PerPage;
  onChange: (value: number | string) => void; // повертаємо оновлене value
};

const options: { value: PerPage; label: string }[] = [
  { value: 4, label: '4' },
  { value: 8, label: '8' },
  { value: 16, label: '16' },
  { value: 'all', label: 'all' },
];

export const ItemsOnPageSelect: React.FC<Props> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.sortByBlock}>
      <p className={`small-text ${styles.specsTitle}`}>Items on page</p>
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
