import { useState } from 'react';
import styles from './ProductsPerPage.module.scss';
import classNames from 'classnames';

type Props = {
  onSelectChange: (perPage: string) => void;
};

export const ProductsPerPage: React.FC<Props> = ({ onSelectChange }) => {
  const [listOpen, setListOpen] = useState(false);
  const [perPageValue, setPerPageValue] = useState('All');

  const handleListItemClick = (perPage: string, header?: string) => {
    setPerPageValue(header ?? perPage);
    onSelectChange(perPage);
    setListOpen(false);
  };

  return (
    <div className={styles.field}>
      <label htmlFor="perpage" className={styles.label}>
        Items on page
      </label>

      <div className={styles.perpage}>
        <div
          className={styles.perpage__header}
          onClick={() => (listOpen ? setListOpen(false) : setListOpen(true))}
        >
          <span className={styles.perpage__value}>{perPageValue}</span>
          <span
            className={classNames(styles.perpage__icon, {
              [styles.perpage__icon_active]: listOpen,
            })}
          ></span>
        </div>
        <ul
          id="perpage"
          className={classNames(styles.perpage__list, {
            [styles.perpage__list_active]: listOpen,
          })}
        >
          <li
            value="4"
            className={styles.perpage__option}
            onClick={() => handleListItemClick('4')}
          >
            4
          </li>
          <li
            value="8"
            className={styles.perpage__option}
            onClick={() => handleListItemClick('8')}
          >
            8
          </li>
          <li
            value="16"
            className={styles.perpage__option}
            onClick={() => handleListItemClick('16')}
          >
            16
          </li>
          <li
            value="All"
            className={styles.perpage__option}
            onClick={() => handleListItemClick('all', 'All')}
          >
            All
          </li>
        </ul>
      </div>
    </div>
  );
};
