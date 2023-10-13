import React, { useState } from 'react';
import cn from 'classnames';
import './Dropdown.scss';

type Props = {
  options: string[];
  chosenOption: string;
  handleOption: (o: string) => void;
};

export const Dropdown: React.FC<Props> = ({
  options,
  chosenOption,
  handleOption,
}) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const handleOptionChange = (option: string) => {
    handleOption(option);
    setIsDropdownActive(false);
  };

  return (
    <div className="Dropdown">
      <button
        type="button"
        className={cn('Dropdown__button', {
          'Dropdown__button--focused': isDropdownActive,
        })}
        onClick={() => setIsDropdownActive(currState => !currState)}
      >
        {chosenOption}
      </button>

      <ul
        className={cn('Dropdown__list', {
          'Dropdown__list--visible': isDropdownActive,
        })}
      >
        {options.map(option => (
          <li key={option}>
            <button
              type="button"
              className="Dropdown__option"
              onClick={() => handleOptionChange(option)}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
