/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import './DropDown.scss';

type Option = {
  value: string,
  label: string,
};

type Props = {
  options: Option[],
  value: string,
  onChange: (newValue: string) => void,
};

export const DropDown: React.FC<Props> = ({
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropDownChange = (newValue: string) => {
    onChange(newValue);
    setIsOpen(false);
  };

  const toggleDropDown = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const filteredOptions = options.filter(
    (obj, i, self) => self.findIndex((o) => o.value === obj.value) === i,
  );

  const selectedOption = filteredOptions.find(
    (option) => option.value === value,
  );

  if (filteredOptions[0].label === 'All') {
    filteredOptions.length = 1;
  }

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleKeyBoardEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      toggleDropDown();
    }
  };

  return (
    <div className="DropDown">
      <div
        className={cn('DropDown__select', {
          'DropDown__select--is-active': isOpen,
        })}
        onClick={toggleDropDown}
        onKeyDown={handleKeyBoardEvent}
        role="button"
        tabIndex={0}
      >
        {selectedOption ? selectedOption.label : ''}
      </div>
      {isOpen && (
        <ul className="DropDown__list">
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              className={cn('DropDown__item', {
                'DropDown__item--selected': value === option.value,
              })}
              onClick={() => handleDropDownChange(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
