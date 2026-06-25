import { useState } from 'react';
import styles from './SortBy.module.scss';

interface SortByProps {
  title: string;
  sortBy: string;
  sortOptions: string[];
  onChange: (newValue: string) => void;
}

export const SortBy: React.FC<SortByProps> = ({
  title,
  sortBy,
  sortOptions,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.sortBy}>
      <div>{title}</div>
      <button
        className={`
          ${styles.button}
          ${open ? styles.activeButton : ''}
          ${sortBy !== 'Newest' && sortBy !== 'all' ? styles.valueCurrent : ''}
        `}
        onClick={() => setOpen(prev => !prev)}
      >
        {sortBy}
        <img
          src="./img/image/Icons/VectorDown.svg"
          alt="Down"
          style={{
            background: 'none',
          }}
        />
      </button>

      {open && (
        <ul className={styles.sortList}>
          {sortOptions.map(option => (
            <li
              key={option}
              className={styles.item}
              onClick={() => {
                onChange(option);
                setOpen(false);
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
