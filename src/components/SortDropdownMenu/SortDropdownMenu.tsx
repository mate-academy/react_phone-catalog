/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import './SortDropdownMenu.scss';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import arrowUp from '../../images/logo/arrowUp.svg';

export const SortDropdownMenu = () => {
  const options = ['Newest', 'Alphabetically', 'Cheapest'];
  const [isActive, setIsActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isSort = searchParams.has('sort');

  if (!isSort) {
    searchParams.set('sort', 'Newest');
  }

  const handleOnBlur = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsActive(false);
    }
  };

  const handleSetSelectedOpiton = (option: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', option);
    setSearchParams(params);
  };

  const toggleActiveMenu = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }

    return setIsActive;
  };

  useEffect(() => {
    if (isActive) {
      document.addEventListener('mousedown', handleOnBlur);
    } else {
      document.removeEventListener('mousedown', handleOnBlur);
    }

    return () => {
      document.removeEventListener('mousedown', handleOnBlur);
    };
  });

  return (
    <div className="sortDropdownMenu" ref={dropdownRef}>
      <label className="sortDropdownMenu__label">Sort By</label>

      <label
        className={classNames('sortDropdownMenu__dropdown', {
          'sortDropdownMenu__dropdown-active': isActive,
        })}
        onClick={toggleActiveMenu}
      >
        <p className="sortDropdownMenu__dropdown-text">
          {isSort ? searchParams.get('sort') : 'Select an option'}
        </p>
        <img
          src={arrowUp}
          alt="Arrow"
          className={classNames('sortDropdownMenu__dropdown_img', {
            'sortDropdownMenu__dropdown_img-active': isActive,
          })}
        />
      </label>

      {isActive && (
        <ul
          className={classNames('sortDropdownMenu__list', {
            'sortDropdownMenu__list-active': isActive,
          })}
        >
          {options.map(option => (
            <li
              className="sortDropdownMenu__item"
              key={option}
              onClick={() => {
                setIsActive(false);
                handleSetSelectedOpiton(option);
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
