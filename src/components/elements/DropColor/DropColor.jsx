// src/components/elements/DropColor/DropColor.jsx
import React, { useState, useRef, useEffect } from 'react';

export const DropColor = ({ value, onChange, availableColors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Закриття при кліку поза дропдауном
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
    <div className="items-select items-select-color" ref={dropdownRef}>
      <span className="label">Filter by color</span>

      <div
        className={`select-box ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className="selected-value">{value || 'All'}</span>
        <span className="arrow">
          <img
            src={
              isOpen
                ? `./images/icons/Chevron_Arrow_Up_black.svg`
                : `./images/icons/Chevron_Arrow_Down.svg`
            }
            alt="arrow"
            className="select-arrow"
          />
        </span>
      </div>

      <ul className={`options-list ${isOpen ? 'open' : ''}`}>
        <li
          className={`option ${value === null ? 'active' : ''}`}
          onClick={() => {
            onChange(null);
            setIsOpen(false);
          }}
        >
          All
        </li>
        {availableColors.map(color => (
          <li
            key={color}
            className={`option ${value === color ? 'active' : ''}`}
            onClick={() => {
              onChange(color);
              setIsOpen(false);
            }}
          >
            {color}
          </li>
        ))}
      </ul>
    </div>
  );
};
