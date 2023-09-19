import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import {
  ReactComponent as ArrowDown,
} from '../../assets/icons/Chevron(ArrowDown).svg';
import {
  ReactComponent as ArrowUp,
} from '../../assets/icons/Chevron(ArrowUp).svg';
import './CustomSelect.scss';
import { SortOptions } from '../../types/SelectOptions';
import { getSearchWith } from '../../helpers/searchHelper';

type Props = {
  options: SortOptions;
  searchParam: string,
};

const normalizeValue = (value: string) => {
  return value
    .split('')
    .map((ch, i) => (i === 0 ? ch.toUpperCase() : ch))
    .join('');
};

export const CustomSelect: React.FC<Props> = ({ options, searchParam }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const param = searchParams.get(searchParam)
    || options.values[0].toLowerCase();

  const handleBtnClick = () => {
    setIsOpen(state => !state);
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleDocumentClick = () => {
      setIsOpen(false);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isOpen]);

  return (
    <div className="select">
      <label
        htmlFor={`button-${options.label}`}
        className="select__label"
      >
        {options.label}
      </label>

      <div className="select__trigger">
        <button
          type="button"
          className={classNames('select__button', {
            'select__button--active': isOpen,
          })}
          id={`button-${options.label}`}
          onClick={handleBtnClick}
        >
          {normalizeValue(param)}

          {!isOpen ? (
            <span className="select__icon">
              <ArrowDown />
            </span>
          ) : (
            <span className="select__icon">
              <ArrowUp />
            </span>
          )}
        </button>
      </div>

      <ul className={classNames('select__list', {
        'select__list--open': isOpen,
      })}
      >
        {options.values.map(value => (
          <li
            className={classNames('select__item', {
              'select__item--active': value.toLowerCase() === param,
            })}
            key={value}
          >
            <Link
              to={{
                search: getSearchWith(searchParams, {
                  [searchParam]: value.toLowerCase(),
                  page: value === 'All' ? null : '1',
                }),
              }}
              className="select__link"
            >
              {normalizeValue(value)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
