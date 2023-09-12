/* eslint-disable max-len */

import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { Product } from '../../types/product';

import './Dropdown.scss';

type Props = {
  phones: Product[]
  arrayValues: string[]
  selectValue: number | string
  param: string
  title: string
};

export const Dropdown: React.FC<Props> = ({
  phones,
  arrayValues,
  selectValue,
  param,
  title,
}) => {
  const [openSelect, setOpenSelect] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelectClick = () => {
    if (!openSelect) {
      setSearchParams(getSearchWith(searchParams, { page: '1' }));

      return setOpenSelect(true);
    }

    return setOpenSelect(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenSelect(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      {title}
      <button
        type="button"
        className="dropdown-value"
        onClick={handleSelectClick}
      >
        {selectValue}
      </button>

      {!openSelect && (
        <ul className={classNames('dropdown-select', { 'hidden-select': openSelect })}>
          {arrayValues.map(item => (
            <li className="dropdown-option" key={item}>
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    [param]: item !== 'All'
                      ? item
                      : phones.length.toString(),
                  }),
                }}
                className="dropdown-link"
                onClick={() => setOpenSelect(true)}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
