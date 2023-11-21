import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Phone } from '../../type/Phone';
import { getSearchWith } from '../../utils/SearchHelper';

type Props = {
  phones: Phone[]
  arrayValues: string[]
  selectValue: number | string
  param: string
  title: string
};

export const DropDown: React.FC<Props> = ({
  phones,
  arrayValues,
  param,
  selectValue,
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
      if (dropdownRef.current
        && !dropdownRef.current.contains(event.target as Node)) {
        setOpenSelect(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={classNames(
        'dropdown',
        {
          'dropdown--sortby': title === 'Sort by',
          'dropdown--onpage': title === 'Items on page',
        },
      )}
      ref={dropdownRef}
    >
      <span className="dropdown__title">
        {title}
      </span>

      <button
        type="button"
        className={classNames(
          'dropdown__value',
          { 'dropdown__value--focused': !openSelect },
        )}
        onClick={handleSelectClick}
      >
        {selectValue}
        {openSelect
          ? (<img src="./images/icons/ArrowDown.svg" alt="" />)
          : (<img src="./images/icons/ArrowTop.svg" alt="" />)}

      </button>

      {!openSelect && (
        <ul
          className={classNames(
            'dropdown__select',
            { 'hidden-select': openSelect },
          )}
        >
          {arrayValues.map(item => (
            <li className="dropdown__option" key={item}>
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    [param]: item !== 'All'
                      ? item
                      : phones.length.toString(),
                  }),
                }}
                className="dropdown__link"
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
