import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { DropdownArrow } from './DropdownArrow';
import { useSearch } from '../_hooks/useSearch';
import { DROPDOWN_HEADINGS } from '../../helpers/storage';

export const Dropdown = ({ list, heading }: DropdownProps) => {
  const [isListOpen, setListOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState(list[0].option);

  const close = useCallback(() => setListOpen(false), [setListOpen]);
  const { search, history } = useSearch();

  useEffect(() => {
    if (isListOpen) {
      window.addEventListener('click', close);
    } else {
      window.removeEventListener('click', close);
    }
  }, [isListOpen, close]);

  const toggleList = () => setListOpen(!isListOpen);

  const handleSort = useCallback((option: string) => {
    setSelectedOption(option);

    if (heading === DROPDOWN_HEADINGS.sortBy) {
      search.set('sortBy', option);
    }

    if (heading === DROPDOWN_HEADINGS.perPage) {
      search.set('perPage', option);
    }

    search.delete('page');

    history.push({ search: search.toString() });
  }, [history, search, heading]);

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
        {isListOpen && (
          <ul className="dropdown__list">
            {list.map(({ option }) => (
              <li key={option}>
                <a
                  className={cn({
                    'dropdown__list-item': true,
                    'dropdown__list-item--active': selectedOption === option,
                  })}
                  onClick={() => handleSort(option)}
                >
                  {option}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
