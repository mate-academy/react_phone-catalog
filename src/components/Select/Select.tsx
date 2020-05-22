import React, { useState } from 'react';
import cn from 'classnames';

import './Select.scss';

export const Select: React.FC = () => {
  const selectValue = ['one', 'two', 'three', 'four', 'five'];
  const [currentValue, setCurrentValue] = useState('one');
  const [isOpen, setIsOpen] = useState(false);

  const chooseSelectValue = (value: string) => {
    setCurrentValue(value);
    setIsOpen(!isOpen);
  };

  return (
    <div className="Select">
      <div
        className={cn({
          'Select__Active': true,
          'Select__Active--opened': isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentValue}
        <span>
          <div className={cn({
            'Select__Arrow': true,
            'Select__Arrow--opened': isOpen,
          })}
          />
        </span>
      </div>
      <ul className={cn({
        'Select__List': true,
        'Select__List--opened': isOpen,
      })}
      >
        {selectValue.map(value => (
          value !== currentValue && (
            <li
              key={value}
              className="Select__Item"
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
