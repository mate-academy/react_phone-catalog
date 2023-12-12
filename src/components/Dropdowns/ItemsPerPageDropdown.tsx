import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

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

  const handleClick = () => {
    setIsListVisible(!isListVisible);
  };

  const values = [
    { field: '16', id: 1 },
    { field: '8', id: 2 },
    { field: '4', id: 3 },
    { field: 'all', id: 4 },
  ];

  // console.log(length);

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
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleClick}
        >
          <span>{currentAmount || 'All'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {isListVisible && (
          <div className="dropdown-content">
            {values.map(option => (
              <Link
                onClick={() => handleSelect(option.field)}
                className={classNames('dropdown-item', {
                  'is-active': currentAmount && currentAmount === +option.field,
                })}
                key={option.id}
                to="."
              >
                {option.field}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
