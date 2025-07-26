/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import './DropdownPerPage.scss';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import arrowUp from '../../images/logo/arrowUp.svg';

export const DropdownPerPage = () => {
  const options = ['4', '8', '16', 'All'];
  const [isActive, setIsActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isPerPage = searchParams.has('perPage');

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

    switch (option) {
      case 'All':
        params.delete('page');
        params.delete('perPage');
        break;

      default:
        params.set('perPage', option);
        params.set('page', `${1}`);
        params.set('transform', `${0}`);
    }

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
    <div className="dropdownPerPage" ref={dropdownRef}>
      <label className="dropdownPerPage__label">Items on page</label>

      <label
        className={classNames('dropdownPerPage__dropdown', {
          'sortDropdownMenu__dropdown-active': isActive,
        })}
        onClick={toggleActiveMenu}
      >
        <p className="dropdownPerPage__dropdown-text">
          {isPerPage ? searchParams.get('perPage') : options[3]}
        </p>
        <img
          src={arrowUp}
          alt="Arrow"
          className={classNames('dropdownPerPage__dropdown_img', {
            'dropdownPerPage__dropdown_img-active': isActive,
          })}
        />
      </label>

      {isActive && (
        <ul
          className={classNames('dropdownPerPage__list', {
            'dropdownPerPage__list-active': isActive,
          })}
        >
          {options.map(option => (
            <li
              className="dropdownPerPage__item"
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
