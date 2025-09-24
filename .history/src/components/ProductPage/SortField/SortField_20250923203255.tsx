/* eslint-disable max-len */
import React, { useEffect, useRef } from 'react';
import styles from './SortField.module.scss';
import { Product } from '../../../types/Product';

type Props = {
  filteredProducts: Product[];
  sort: string;
  openSort: boolean;
  setSort: (sort: string) => void;
  setOpenSort: (openSort: boolean) => void;
  item: string;
  openItem: boolean;
  setItem: (item: string) => void;
  setOpenItem: (openItem: boolean) => void;
  setPerPage: (count: number) => void;
};

export const SortField: React.FC<Props> = ({
  filteredProducts: phones,
  sort,
  openSort,
  setSort,
  setOpenSort,
  item,
  openItem,
  setItem,
  setOpenItem,
  setPerPage,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenSort(false);
        setOpenItem(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [setOpenSort, setOpenItem]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.first}>
        <span className={styles.title}>Sort by</span>
        <button className={styles.button} onClick={() => setOpenSort(!openSort)}>
          {sort}
          <img
            src={openSort ? 'images/Chevron (Arrow Up).svg' : 'images/Select Down.svg'}
            alt="arr"
          />
        </button>

        {openSort && (
          <ul className={styles.select}>
            <li
              onClick={() => {
                setSort('Newest');
                setOpenSort(!openSort);
              }}
            >
              Newest
            </li>
            <li
              onClick={() => {
                setSort('Alphabetically');
                setOpenSort(!openSort);
              }}
            >
              Alphabetically
            </li>
            <li
              onClick={() => {
                setSort('Cheapest');
                setOpenSort(!openSort);
              }}
            >
              Cheapest
            </li>
          </ul>
        )}
      </div>

      <div className={styles.second}>
        <span className={styles.title}>Items on page</span>
        <button className={styles.button} onClick={() => setOpenItem(!openItem)}>
          {item}
          <img
            src={openItem ? 'images/Select Up (Stroke).svg' : 'images/Select (Stroke).svg'}
            alt="arr"
          />
        </button>

        {openItem && (
          <ul className={styles.select}>
            <li
              onClick={() => {
                setItem('4');
                setPerPage(4);
                setOpenItem(!openItem);
              }}
            >
              4
            </li>
            <li
              onClick={() => {
                setItem('8');
                setPerPage(8);
                setOpenItem(!openItem);
              }}
            >
              8
            </li>
            <li
              onClick={() => {
                setItem('16');
                setPerPage(16);
                setOpenItem(!openItem);
              }}
            >
              16
            </li>
            <li
              onClick={() => {
                setItem('All');
                setPerPage(phones.length);
                setOpenItem(!openItem);
              }}
            >
              All
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
