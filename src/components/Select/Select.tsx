import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import './Select.scss';

export const Select: React.FC = () => {
  const selectValue = ['one', 'two', 'three', 'four', 'five'];
  const [currentValue, setCurrentValue] = useState('one');
  const [isOpen, setIsOpen] = useState(false);

  const chooseSelectValue = (value: string) => {
    setCurrentValue(value);
    setIsOpen(false);
  };

  const clickSubscribe = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.removeEventListener('click', clickSubscribe);
    } else {
      document.documentElement.addEventListener('click', clickSubscribe);
    }
  }, [isOpen]);

  return (
    <div
      className={cn({
        Select: true,
        Select__Closest: !isOpen,
      })}
    >
      <label
        className={cn({
          "Select__Active--after": isOpen,
        })}></label>

      <button
        type="button"
        className={cn({
          Select__Active: true,
          'Select__Active--opened': isOpen,
        })}
        onClick={() => setIsOpen(true)}
      >
        {currentValue}
        <span>
          <div className={cn({
            Select__Arrow: true,
            'Select__Arrow--opened': isOpen,
          })}
          />
        </span>
      </button>
      <ul className={cn({
        Select__List: true,
        'Select__List--opened': isOpen,
      })}
      >
        {selectValue.map(value => (
          value !== currentValue && (
            <li
              key={value}
              className="Select__Item"
              data-value={value}
              onClick={() => chooseSelectValue(value)}
            >
              {value}
            </li>
          )
        ))}
      </ul>
    </div>
  );
};
