import React, { useState } from 'react';
import './DropDown.scss';

type Props = {
  options: string[] | number[],
  defaultOption: string | number,
  selectedOption: string | number,
  changeOption: (optionName: string | number) => void,
};

export const Dropdown: React.FC<Props> = ({
  options,
  selectedOption,
  defaultOption,
  changeOption,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleOptionSelect = (option: string | number) => {
    changeOption(option);
    closeDropdown();
  };

  return (
    <div
      className="dropdown-container"
    >
      <p>Sort</p>
      <button
        className="dropdown-button"
        onClick={toggleDropdown}
        type="button"
      >
        {selectedOption || defaultOption}
      </button>
      {isDropdownOpen && (
        <div
          className="dropdown-options"
          onBlur={closeDropdown}
        >
          {options.map(option => (
            <li
              key={option}
              onClick={() => handleOptionSelect(option)}
              aria-hidden
            >
              {option}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};
