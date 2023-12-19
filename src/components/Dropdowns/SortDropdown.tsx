import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useBlur } from '../../helpers/hooks/UseBlur';
// import { SearchLink } from '../SearchLink/SearchLink';

type Option = {
  field: string,
  id: number,
  value: SortField,
};

export enum SortField {
  AGE = 'age',
  NAME = 'name',
  PRICE = 'price',
}

export const SortDropdown: React.FC = () => {
  const [isListVisible, setIsListVisible] = useState(false);
  const dropdownRef = useBlur(() => setIsListVisible(false));
  const [optionField, setOptionField] = useState('Newest');
  const [searchParams, setSearchParams] = useSearchParams();
  const [optionValue, setOptionValue] = useState('age');
  const [sort, setSort] = useState('');

  // const params = Object.fromEntries([...searchParams]);
  // console.log('Mounted:', params);

  useEffect(() => {
    // read the params on component load and when any changes occur
    // const currentParams = Object.fromEntries([...searchParams]);
    // get new values on change
    // console.log('useEffect:', currentParams);
    // update the search params programmatically
    if (sort) {
      setSearchParams(({ sort: optionValue }));
      // setSearchParams(prev => ({...prev, sort: optionValue }));
      // setSearchParams(prev => ({ ...prev, sort: optionValue }));
    }
  }, [searchParams, optionValue, setSearchParams, sort]);

  useEffect(() => {
    switch (searchParams.get('sort')) {
      case SortField.PRICE:
        setOptionField('Cheapest');

        break;

      case SortField.NAME:
        setOptionField('Alphabetically');

        break;

      default:
        setOptionField('Newest');
    }
  }, [searchParams]);

  const handleClick = () => {
    setIsListVisible(!isListVisible);
  };

  const options = [
    { field: 'Newest', id: 1, value: SortField.AGE },
    { field: 'Alphabetically', id: 2, value: SortField.NAME },
    { field: 'Cheapest', id: 3, value: SortField.PRICE },
  ];

  const handleSelect = (option: Option) => {
    const { value } = option;

    if (option.value === searchParams.get('sort')) {
      handleClick();

      return;
    }

    setOptionValue(value);
    setIsListVisible(false);
    setSort(value);
  };

  return (
    <div
      data-cy="UserSelector"
      className="dropdown"
      ref={dropdownRef}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        onClick={handleClick}
        className={classNames('dropdown__button dropdown__button--select', {
          'dropdown__button--focused': isListVisible,
        })}
      >
        <span>{optionField || 'Choose a option'}</span>
      </button>

      {isListVisible && (
        <div className="option-container">
          {options.map(option => (
            // <SearchLink
            //   role="button"
            //   onClick={() => handleSelect(option)}
            //   className="dropdown__button dropdown__button--option"
            //   key={option.id}
            //   params={{ sort: option.value }}
            // >
            //   {option.field}
            // </SearchLink>
            <NavLink
              role="button"
              onClick={() => handleSelect(option)}
              className="dropdown__button dropdown__button--option"
              key={option.id}
              to="."
            >
              {option.field}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};
