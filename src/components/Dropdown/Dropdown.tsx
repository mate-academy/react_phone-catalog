import React, { useEffect, useRef, useState } from 'react';
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

  const currentSortLabel = sortOptions.find(
    option => option.value === sort,
  )?.label;

  const perPageOpt: PerPageType[] = [8, 16, 32];

  const handleSetSort = (value: string) => {
    const sortValue = value as SortType;

    updateSort(sortValue);
  };

  const handleSetPerPage = (value: number) => {
    const perPageVal = value as PerPageType;

    updatePerPage(perPageVal);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsOpenSort(false);
      }

      if (
        perPageRef.current &&
        !perPageRef.current.contains(event.target as Node)
      ) {
        setIsOpenPerPage(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdown__container}>
        <div className={styles.dropdown__sortbox} ref={sortRef}>
          <div className={styles.dropdown__text}>Sort by</div>
          <div
            className={styles.dropdown__select_menu}
            onClick={() => setIsOpenSort(prev => !prev)}
          >
            <div className={styles.text}>{currentSortLabel}</div>
            <Icon name="arrowdown" className={styles.icon} />
          </div>
          {isOpenSort && (
            <ul className={styles.dropdown__list}>
              {sortOptions.map(option => (
                <li
                  key={option.value}
                  className={styles.dropdown__item}
                  onClick={() => {
                    handleSetSort(option.value);
                    setIsOpenSort(prev => !prev);
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.dropdown__perpagebox} ref={perPageRef}>
          <div className={styles.dropdown__text}>Item on page</div>
          <div
            className={styles.dropdown__select_menu}
            onClick={() => setIsOpenPerPage(prev => !prev)}
          >
            <div className={styles.text}>{perPage}</div>
            <Icon name="arrowdown" className={styles.icon} />
          </div>
          {isOpenPerPage && (
            <ul className={styles.dropdown__list}>
              {perPageOpt.map(option => (
                <li
                  key={option}
                  className={styles.dropdown__item}
                  onClick={() => {
                    handleSetPerPage(option);
                    setIsOpenPerPage(prev => !prev);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
