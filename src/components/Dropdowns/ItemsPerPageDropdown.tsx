import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useBlur } from '../../helpers/hooks/UseBlur';

type Props = {
  setItemsPerPage: (newAmount: number) => void,
  currentAmount: number,
  length: number,
};

export const ItemsPerPageDropdown: React.FC<Props> = ({
  setItemsPerPage = () => { },
  currentAmount = 16,
  length = 100,
}) => {
  const [isListVisible, setIsListVisible] = useState(false);
  const dropdownRef = useBlur(() => setIsListVisible(false));

  const handleClick = () => {
    setIsListVisible(!isListVisible);
  };

  const values = [
    { field: '16', id: 1 },
    { field: '8', id: 2 },
    { field: '4', id: 3 },
    { field: 'all', id: 4 },
  ];

  const handleSelect = (amount: string) => {
    if (amount === 'all') {
      setItemsPerPage(length);
      setIsListVisible(false);

      return;
    }

    if (+amount === currentAmount) {
      handleClick();

      return;
    }

    setItemsPerPage(+amount);
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
            <Link
              role="button"
              onClick={() => handleSelect(option.field)}
              className="dropdown__button dropdown__button--option"
              key={option.id}
              to="."
            >
              {option.field}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
