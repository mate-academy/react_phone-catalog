import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import style from './Dropdown.module.scss';
import ArrowDown from '../../../public/img/Icons/arrow-down-Icon.svg';
import ArrowUp from '../../../public/img/Icons/arrow-up-Icon.svg';

type Props = {
  sort: string;
  updateSort: (value: string) => void;
  perPage: number;
  updatePerPage: (value: number) => void;
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

  const sortToLabel = (value: string) => {
    switch (value) {
      case 'name':
        return 'Alphabetical';
      case 'price':
        return 'Cheapest';
      case 'age':
      default:
        return 'Newest';
    }
  };

  const labelToSort = (label: string) => {
    switch (label) {
      case 'Alphabetically':
        return 'name';
      case 'Cheapest':
        return 'price';
      case 'Newest':
      default:
        return 'age';
    }
  };

  const [selectedValue, setSelectedValue] = useState(sortToLabel(sort));
  const [selectedPerPage, setSelectedPerPage] = useState(perPage.toString());

  const options = ['Newest', 'Alphabetically', 'Cheapest'];
  const perPageOptions = ['8', '16', '32'];

  const handleSelect = (label: string) => {
    setSelectedValue(label);
    setIsOpenSort(false);
    updateSort(labelToSort(label));
  };

  const handlePerPageSelect = (value: string) => {
    setSelectedPerPage(value);
    setIsOpenPerPage(false);
    updatePerPage(parseInt(value, 10));
  };

  useEffect(() => {
    setSelectedValue(sortToLabel(sort));
  }, [sort]);

  useEffect(() => {
    setSelectedPerPage(perPage.toString());
  }, [perPage]);

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
    <div className={style.dropdownContainer}>
      <div className={`${style.dropdownBox} ${style.sortByBox}`}>
        <p className={style.smallText}>Sort by</p>

        <div className={style.dropdown} ref={sortRef}>
          <div
            className={style.dropdownTrigger}
            onClick={() => setIsOpenSort(prev => !prev)}
          >
            <div className={style.triggerName}>{selectedValue}</div>

            <img
              src={isOpenSort ? ArrowUp : ArrowDown}
              alt="arrow"
              className={style.icon}
            />
          </div>

          <div
            className={cn(style.dropdownContent, {
              [style.active]: isOpenSort,
            })}
          >
            <ul className={style.content}>
              {options.map(option => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={cn(style.li, {
                    [style.selected]: selectedValue === option,
                  })}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={`${style.dropdownBox} ${style.itemsOnPageBox}`}>
        <p className={style.smallText}>Items on page</p>

        <div className={style.dropdown} ref={perPageRef}>
          <div
            className={style.dropdownTrigger}
            onClick={() => setIsOpenPerPage(prev => !prev)}
          >
            <div className={style.triggerName}>{selectedPerPage}</div>

            <img
              src={isOpenPerPage ? ArrowUp : ArrowDown}
              alt="arrow"
              className={style.icon}
            />
          </div>

          <div
            className={cn(style.dropdownContent, {
              [style.active]: isOpenPerPage,
            })}
          >
            <ul className={style.content}>
              {perPageOptions.map(value => (
                <li
                  key={value}
                  onClick={() => handlePerPageSelect(value)}
                  className={cn(style.li, {
                    [style.selected]: selectedPerPage === value,
                  })}
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
