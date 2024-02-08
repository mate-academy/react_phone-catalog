import React, { memo } from 'react';

import './Dropdown.scss';
import ArrowIcon from '../Icons/ArrowIcon';
import { useDropdown } from './useDropdown';

export type DropdownOption = string | number;

export interface DropdownProps {
  options: DropdownOption[],
  selectedOption: DropdownOption,
  onChange: (option: DropdownOption) => void,
  name?: string,
  className?: string,
  width?: string,
}

export const Dropdown: React.FC<DropdownProps> = memo((props) => {
  const { name, width, className, options} = props;
  const {
    list,
    listStyle,
    openClass,
    openButton,
    isOpen,
    selectedOption,
    handleOpen,
    handleBlur,
    handleOptionChange,
    getItemClasses,
  } = useDropdown(props);

  return (
    <div className={`dropdown ${className || ''}`} style={{ width }}>
      {name && (
        <h6 className='dropdown__name'>{name}</h6>
      )}

      <div className={`dropdown__box ${openClass}`}>
        <button
          className="dropdown__button"
          onClick={handleOpen}
          ref={openButton}
          onBlur={handleBlur}
        >
          <span>{selectedOption}</span>

          <ArrowIcon
            className='dropdown__arrow'
            rotate={isOpen ? 90 : 270}
            fill='var(--c-tips)'
          />
        </button>

        <ul className='dropdown__list' style={listStyle} ref={list}>
          {options.map(option => (
            <li
              className={getItemClasses(option)}
              onMouseDown={handleOptionChange(option)}
              key={option}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
