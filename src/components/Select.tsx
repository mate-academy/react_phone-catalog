/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PerPage } from '../types/PerPage';
import { SortBy } from '../types/SortBy';
import { getSearchWith } from '../utils/getSearchWith';

type Props = {
  options: PerPage [] | SortBy[],
  current: PerPage | SortBy | string,
  title: string;
  searchPar: string;
  isLong: boolean;
};

export const Select: React.FC<Props> = ({
  options,
  current,
  title,
  searchPar,
  isLong,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const optionsRef = useRef<HTMLUListElement | null>(null);
  const intervalRef = React.useRef<null | NodeJS.Timeout>(null);

  const handleClickDropDown = () => {
    intervalRef.current = setTimeout(() => {
      setIsOpen(currentState => !currentState);
    }, 200);
  };

  const handleClickOutside
  = ({ target }: MouseEvent): void => {
    if ((isOpen
      && dropDownRef
      && !dropDownRef.current?.contains(target as Node))
      || optionsRef.current?.contains(target as Node)) {
      intervalRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 200);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    if (!isOpen) {
      clearTimeout(intervalRef.current as NodeJS.Timeout);
    } else {
      optionsRef.current?.focus();
    }

    if (document.activeElement === optionsRef.current) {
      setIsOpen(true);
    }
  }, [isOpen]);

  useEffect(() => {
    return document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="select">
      <p className="select__title">{title}</p>
      <div
        tabIndex={0}
        role="button"
        ref={dropDownRef}
        className={classNames(
          'select-box',
          { 'long-box': isLong },
        )}
        onClick={handleClickDropDown}
        onKeyDown={handleClickDropDown}
      >
        <p className="select-box__text-item">
          {current}
        </p>
        <div
          className={classNames(
            'select-box__button',
            { 'active-select': isOpen },
          )}
        />
        {isOpen && (
          <ul
            className={classNames(
              'select-options',
              { 'long-box': isLong },
            )}
            ref={optionsRef}
          >
            {options.map(option => (
              <li
                key={option}
              >
                <Link
                  to={{
                    search: getSearchWith(
                      searchParams,
                      { [`${searchPar}`]: `${option}` },
                    ),
                  }}
                  className="select-options__item"
                >
                  <p className="select-box__text-item">{option}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
