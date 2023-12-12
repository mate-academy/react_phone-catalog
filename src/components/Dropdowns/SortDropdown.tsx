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
      className="dropdown"
    >
      {/* <div className="dropdown__button-wrapper"> */}
      <button
        type="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        onClick={handleClick}
        onBlur={() => handleClick}
        className={classNames('dropdown__button dropdown__button--select', {
          'dropdown__button--focused': isListVisible,
        })}
      >
        <span>{currentField || 'Choose a option'}</span>
      </button>
      {/* </div> */}

      {/* <div className="dropdown-menu" id="dropdown-menu" role="menu"> */}
      {isListVisible && (
        <div className="option-container">
          {options.map(option => (
            <Link
              onClick={() => handleSelect(option.field)}
              className="dropdown__button dropdown__button--option"
              // className={classNames('dropdown-item', {
              //   'is-active': currentField && currentField === option.field,
              // })}
              key={option.id}
              to="."
            >
              {option.field}
            </Link>
          ))}
        </div>
      )}
      {/* </div> */}
    </div>
  );
};
