import React, { useRef, useState } from 'react';
import styles from './Dropdown.module.scss';
import { Icon } from '../Icon';
import { SortType } from '../../types/SortType';
import { PerPageType } from '../../types/PerPageType';

type Props = {
  sort: SortType;
  updateSort: (sort: SortType) => void;
  perPage: PerPageType;
  updatePerPage: (perPage: PerPageType) => void;
};

export const Dropdown: React.FC<Props> = ({
  sort,
  updateSort,
  perPage,
  updatePerPage,
}) => {
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [isOpenPerPage, setIsOpenPerPage] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);
  const perPageRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { value: 'date', label: 'Newest' },
    { value: 'name', label: 'Alphabetically' },
    { value: 'price', label: 'Cheapest' },
  ];

  const perPageOpt: PerPageType[] = [8, 16, 32];

  const handleSetSort = (value: string) => {
    const sortValue = value as SortType;

    updateSort(sortValue);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdown__container}>
        <div className={styles.dropdown__sortbox}>
          <div className={styles.dropdown__text}>Sort by</div>
          <div className={styles.dropdown__select_menu} ref={sortRef}>
            <div className={styles.text}>Newest</div>
            <Icon name="arrowdown" className={styles.icon} />
          </div>
        </div>
        <div className={styles.dropdown__perpagebox}>
          <div className={styles.dropdown__text}>Item on page</div>
          <div className={styles.dropdown__select_menu} ref={perPageRef}>
            <div className={styles.text}>16</div>
            <Icon name="arrowdown" className={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  );
};
