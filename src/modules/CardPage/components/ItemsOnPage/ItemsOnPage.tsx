import { useState } from 'react';
import styles from '../Dropdown.module.scss';

interface ItemsOnPageProps {
  current: string;
  items: string[];
  onChange: (perPage: string | number) => void;
}

export const ItemsOnPage: React.FC<ItemsOnPageProps> = ({
  current,
  items,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.itemsOnPage}>
      <div>Items on page</div>
      <button
        className={`
          ${styles.button}
          ${open ? styles.activeButton : ''}
          ${current !== 'all' ? styles.valueCurrent : ''}
        `}
        onClick={() => setOpen(prev => !prev)}
      >
        {current}
        <img
          src="./img/image/Icons/VectorDown.svg"
          alt="Down"
          style={{ background: 'none' }}
        />
      </button>

      {open && (
        <ul className={styles.sortList}>
          {items.map(option => (
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
