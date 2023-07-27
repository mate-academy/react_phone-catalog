/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import './DropDown.scss';

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (newValue: string) => void;
};

export const DropDown: React.FC<Props> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropDownChange = (newValue: string) => {
    onChange(newValue);
    setIsOpen(false);
  };

  const toggleDropDown = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const handleKeyboardEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
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
        onKeyDown={handleKeyboardEvent}
        role="button"
        tabIndex={0}
      >
        {selectedOption ? selectedOption.label : ''}
      </div>
      {isOpen && (
        <ul className="DropDown__list">
          {options.map((option) => (
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
