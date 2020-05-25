import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { DropdownArrow } from './DropdownArrow';

export const Dropdown = ({ list, heading }: DropdownProps) => {
  const [isListOpen, setListOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState(list[0].option);

  const close = useCallback(() => setListOpen(false), [setListOpen]);

  useEffect(() => {
    if (isListOpen) {
      window.addEventListener('click', close);
    } else {
      window.removeEventListener('click', close);
    }
  }, [isListOpen, close]);

  const toggleList = () => setListOpen(!isListOpen);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setListOpen(false);
  };

  return (
    <div className="dropdown__container">
      <p className="dropdown__heading">{heading}</p>
      <div className="dropdown__wrapper">
        <div
          className={cn({
            dropdown__header: true,
            'dropdown__header--focused': isListOpen,
          })}
          onClick={toggleList}
        >
          <div className="dropdown__header-title">
            {selectedOption}
          </div>
          <DropdownArrow isListOpen={isListOpen} />
        </div>
        {isListOpen && (
          <ul className="dropdown__list">
            {list.map(({ option }) => (
              <li
                key={option}
                className={cn({
                  'dropdown__list-item': true,
                  'dropdown__list-item--active': selectedOption === option,
                })}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
