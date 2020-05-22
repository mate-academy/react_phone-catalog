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
          Select__active: true,
          'Select__active--opened': isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentValue}
        <span>
          <div className={cn({
            Icon__image: true,
            'Icon__image--inactive': true,
            'Icon__image--arrow-down': true,
            Select__arrow: true,
            'Select__arrow--opened': isOpen,
          })}
          />
        </span>
      </div>
      <ul className={cn({
        Select__list: true,
        'Select__list--opened': isOpen,
      })}
      >
        {selectValue.map(value => (
          value !== currentValue && (
            <li
              key={value}
              className="Select__item"
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
