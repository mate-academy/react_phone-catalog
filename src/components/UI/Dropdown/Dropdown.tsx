import React, { memo, useRef, useState } from 'react';

import './Dropdown.scss';
import ArrowIcon from '../ArrowIcon';

export type DropdownOption = string | number;

interface Props {
  options: DropdownOption[],
  selectedOption: DropdownOption,
  onChange: (option: DropdownOption) => void,
  name?: string,
  className?: string,
}

export const Dropdown: React.FC<Props> = memo(({
  options,
  selectedOption,
  name,
  className,
  onChange,
}) => {
  const openButton = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const openClass = isOpen ? 'dropdown__box--open' : '';

  const handleOpen = () => {
    openButton.current?.focus();
    setIsOpen(prev => !prev)
  }

  const handleBlur = () => {
    setIsOpen(false);
  };

  const handleOptionChange = (option: DropdownOption) => () => {
    onChange(option);
    setIsOpen(false);
  };

  const getItemClasses = (option: DropdownOption) => {
    return 'dropdown__item' + (option === selectedOption
      ? ' dropdown__item--selected' : '');
  };

  return (
    <div className={`dropdown ${className || ''}`}>
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

        {isOpen && (
          <ul className='dropdown__list'>
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
        )}
      </div>
    </div>
  );
});
