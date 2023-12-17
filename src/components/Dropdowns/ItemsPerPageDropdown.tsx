import React, { useState } from 'react';
import classNames from 'classnames';
import { useBlur } from '../../helpers/hooks/UseBlur';
import { SearchLink } from '../SearchLink/SearchLink';

type Props = {
  currentAmount: number,
  length: number,
};

export const ItemsPerPageDropdown: React.FC<Props> = ({
  currentAmount = 16,
  length = 100,
}) => {
  const [isListVisible, setIsListVisible] = useState(false);
  const dropdownRef = useBlur(() => setIsListVisible(false));

  const handleClick = () => {
    setIsListVisible(!isListVisible);
  };

  const values = [
    { field: '16', id: 1, value: 16 },
    { field: '8', id: 2, value: 8 },
    { field: '4', id: 3, value: 4 },
    { field: 'all', id: 4, value: length },
  ];

  const handleSelect = (amount: string) => {
    if (amount === 'all') {
      setIsListVisible(false);

      return;
    }

    if (+amount === currentAmount) {
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
      <button
        type="button"
        className={classNames('dropdown__button dropdown__button--select', {
          'dropdown__button--focused': isListVisible,
        })}
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        onClick={handleClick}
        onBlur={() => handleClick}
      >
        <span>{currentAmount <= 16 ? currentAmount : 'All'}</span>

      </button>

      {isListVisible && (
        <div className="option-container">
          {values.map(option => (
            <SearchLink
              role="button"
              onClick={() => handleSelect(option.field)}
              className="dropdown__button dropdown__button--option"
              key={option.id}
              params={{ perPage: option.value.toString() }}
            >
              {option.field}
            </SearchLink>
          ))}
        </div>
      )}
    </div>
  );
};
