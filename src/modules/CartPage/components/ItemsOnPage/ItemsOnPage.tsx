import { useState } from 'react';
import styles from './ItemsOnPage.module.scss';

interface ItemsOnPageProps {
  current: number;
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
      <button className={styles.button} onClick={() => setOpen(prev => !prev)}>
        {current}
        <img
          src="./img/SliderImg/Down.svg"
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
