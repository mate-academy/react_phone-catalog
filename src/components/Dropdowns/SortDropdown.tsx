import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  setSortField: (newField: string) => void,
  currentField: string,
};

export const SortDropdown: React.FC<Props> = ({
  setSortField = () => { },
  currentField,
}) => {
  const [isListVisible, setIsListVisible] = useState(false);

  const handleClick = () => {
    setIsListVisible(!isListVisible);
  };

  const options = [
    { field: 'Newest', id: 1 },
    { field: 'Alphabetically', id: 2 },
    { field: 'Cheapest', id: 3 },
  ];

  const handleSelect = (option: string) => {
    if (option === currentField) {
      handleClick();

      return;
    }

    setSortField(option);
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
          <span>{currentField || 'Choose a option'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {isListVisible && (
          <div className="dropdown-content">
            {options.map(option => (
              <Link
                onClick={() => handleSelect(option.field)}
                className={classNames('dropdown-item', {
                  'is-active': currentField && currentField === option.field,
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
