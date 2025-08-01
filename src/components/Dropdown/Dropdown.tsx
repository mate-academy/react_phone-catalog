
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import './dropdown.scss';

export const Dropdown: React.FC = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Newest');
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = ['Newest', 'Alphabetically', 'Cheapest'];

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpenDropdown(false);

    const sortValue =
      value === 'Newest' ? 'age'
      : value === 'Alphabetically' ? 'name'
      : value === 'Cheapest' ? 'price'
      : '';

    searchParams.set('sort', sortValue);
    setSearchParams(searchParams);
  };

  const toggleDropdown = () => {
    setIsOpenDropdown(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const sortParam = searchParams.get('sort');

    if (sortParam === 'name') setSelectedValue('Alphabetically');
    else if (sortParam === 'price') setSelectedValue('Cheapest');
    else setSelectedValue('Newest');
  }, [searchParams]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-trigger" onClick={toggleDropdown}>
        {selectedValue}
      </div>

      <div className={cn('dropdown-content', { active: isOpenDropdown })}>
        <ul className="content">
          {options.map(option => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={cn({ selected: selectedValue === option })}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
