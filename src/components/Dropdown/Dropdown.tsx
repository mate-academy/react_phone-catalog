import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import './dropdown.scss';

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
    <div className="dropdown-container">
      <div className="dropdown-box sort-by-box">
        <p className="small-text-12">Sort by</p>

        <div className="dropdown " ref={sortRef}>
          <div
            className="dropdown-trigger "
            onClick={() => setIsOpenSort(prev => !prev)}
          >
            <div className="trigger-name">{selectedValue}</div>

            {isOpenSort ? (
              <img
                src="img/icons/ArrowUpChevron.svg"
                alt="chevron"
                className="icon"
              />
            ) : (
              <img
                src="img/icons/ArrowDownChevron.svg"
                alt="chevron"
                className="icon"
              />
            )}
          </div>

          <div className={cn('dropdown-content', { active: isOpenSort })}>
            <ul className="content">
              {options.map(option => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={cn('li', { selected: selectedValue === option })}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="dropdown-box items-on-page-box">
        <p className="small-text-12">Items on page</p>

        <div className="dropdown" ref={perPageRef}>
          <div
            className="dropdown-trigger"
            onClick={() => setIsOpenPerPage(prev => !prev)}
          >
            {selectedPerPage}
            {isOpenPerPage ? (
              <img
                src="img/icons/ArrowUpChevron.svg"
                alt="chevron"
                className="icon"
              />
            ) : (
              <img
                src="img/icons/ArrowDownChevron.svg"
                alt="chevron"
                className="icon"
              />
            )}
          </div>

          <div className={cn('dropdown-content', { active: isOpenPerPage })}>
            <ul className="content">
              {perPageOptions.map(value => (
                <li
                  key={value}
                  onClick={() => handlePerPageSelect(value)}
                  className={cn('li', { selected: selectedPerPage === value })}
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
