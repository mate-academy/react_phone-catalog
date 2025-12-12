import React, { useState, useEffect, useRef } from 'react';

export const PriceSortDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { label: 'By default', value: 'default' },
    { label: 'From cheapest', value: 'asc' },
    { label: 'From most expensive', value: 'desc' },
  ];

  const selectedOption = options.find(option => option.value === value);

  // Закриття при кліку поза селектором
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="items-select items-select-price" ref={dropdownRef}>
      <span className="label">Sort by price</span>

      <div
        className={`select-box ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className="selected-value">{selectedOption?.label}</span>
        <span className="arrow">
          <img
            src={
              isOpen
                ? './images/icons/Chevron_Arrow_Up_black.svg'
                : './images/icons/Chevron_Arrow_Down.svg'
            }
            alt="arrow"
            className="select-arrow"
          />
        </span>
      </div>

      <ul className={`options-list ${isOpen ? 'open' : ''}`}>
        {options.map(option => (
          <li
            key={option.value}
            className={`option ${option.value === value ? 'active' : ''}`}
            onClick={() => {
              onChange(option.value);
              setIsOpen(false);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
