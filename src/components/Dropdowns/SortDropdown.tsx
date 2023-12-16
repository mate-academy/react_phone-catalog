import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useBlur } from '../../helpers/hooks/UseBlur';

type Props = {
  setSortField: (newField: string) => void,
  currentField: string,
};

export const SortDropdown: React.FC<Props> = ({
  setSortField = () => { },
  currentField,
}) => {
  const [isListVisible, setIsListVisible] = useState(false);
  const dropdownRef = useBlur(() => setIsListVisible(false));

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
        <span>{currentField || 'Choose a option'}</span>
      </button>

      {isListVisible && (
        <div className="option-container">
          {options.map(option => (
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
