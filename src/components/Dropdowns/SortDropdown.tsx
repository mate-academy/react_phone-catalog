import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useBlur } from '../../helpers/hooks/UseBlur';
import { SearchLink } from '../SearchLink/SearchLink';

type Option = {
  field: string,
  id: number,
  value: SortField,
};

type Props = {
  setCurrPage: (newPage: number) => void
};

export enum SortField {
  AGE = 'age',
  NAME = 'name',
  PRICE = 'price',
}

export const SortDropdown: React.FC<Props> = ({
  setCurrPage = () => {},
}) => {
  const [isListVisible, setIsListVisible] = useState(false);
  const dropdownRef = useBlur(() => setIsListVisible(false));
  const [optionField, setOptionField] = useState('Newest');
  const [searchParams] = useSearchParams();

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
    setCurrPage(1);

    if (option.value === searchParams.get('sort')) {
      handleClick();

      return;
    }

    setIsListVisible(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className="dropdown"
      ref={dropdownRef}
    >
      <p className="dropdown__name">Sort by</p>
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
            <SearchLink
              role="button"
              onClick={() => handleSelect(option)}
              className="dropdown__button dropdown__button--option"
              key={option.id}
              params={{ sort: option.value, page: '1' }}
            >
              {option.field}
            </SearchLink>
          ))}
        </div>
      )}
    </div>
  );
};
