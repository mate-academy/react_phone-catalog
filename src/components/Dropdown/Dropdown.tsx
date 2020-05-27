import React  from 'react';
import cn from 'classnames';
import { DropdownArrow } from './DropdownArrow';
import { useDropdown } from '../_hooks/useDropdown';

export const Dropdown = ({ list, heading }: DropdownProps) => {
  const {
    toggleList,
    selectedOption,
    isListOpen,
    handleSort,
  } = useDropdown(list,heading);

  return (
    <div className="dropdown">
      <p className="dropdown__heading">{heading}</p>
      <div className="dropdown__wrapper">
        <button
          type="button"
          className="dropdown__header"
          onClick={toggleList}
        >
          {selectedOption}
          <DropdownArrow isListOpen={isListOpen} />
        </button>
        <ul className={cn({
          dropdown__list: true,
          'dropdown__list--is-open': isListOpen,
        })}
        >
          {list.map(({ option }) => (
            <li key={option}>
              <a
                href="#!"
                className={cn({
                  'dropdown__list-item': true,
                  'dropdown__list-item--active': selectedOption === option,
                })}
                onClick={(e) => {
                  e.preventDefault();
                  handleSort(option);
                }}
              >
                {option}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
