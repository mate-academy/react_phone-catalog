import { useState } from 'react';
import styles from './ProductsSort.module.scss';
import classNames from 'classnames';

type Props = {
  onSelectChange: (sortType: string) => void;
};

export const ProductsSort: React.FC<Props> = ({ onSelectChange }) => {
  const [value, setValue] = useState('Newest');
  const [listOpen, setListOpen] = useState(false);

  const handleListItemClick = (v: string, sortType: string) => {
    setValue(v);
    onSelectChange(sortType);
    setListOpen(false);
  };

  return (
    <div className={styles.field}>
      <label htmlFor="sort" className={styles.label}>
        Sort by
      </label>

      <div className={styles.sort}>
        <div
          className={styles.sort__header}
          onClick={() => (listOpen ? setListOpen(false) : setListOpen(true))}
        >
          <span className={styles.sort__value}>{value}</span>
          <span
            className={classNames(styles.sort__icon, {
              [styles.sort__icon_active]: listOpen,
            })}
          ></span>
        </div>
        <ul
          id="sort"
          className={classNames(styles.sort__list, {
            [styles.sort__list_active]: listOpen,
          })}
        >
          <li
            value="age"
            className={styles.sort__option}
            onClick={() => handleListItemClick('Newest', 'age')}
          >
            Newest
          </li>
          <li
            value="title"
            className={styles.sort__option}
            onClick={() => handleListItemClick('Alphabetically', 'title')}
          >
            Alphabetically
          </li>
          <li
            value="price"
            className={styles.sort__option}
            onClick={() => handleListItemClick('Cheapest', 'price')}
          >
            Cheapest
          </li>
        </ul>
      </div>
    </div>
  );
};
