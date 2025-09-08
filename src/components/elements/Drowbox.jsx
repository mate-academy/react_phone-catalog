import React, { useState, useRef, useEffect } from 'react';
import './Drowbox.scss';

export const Drowbox = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const options = [4, 8, 16, 'All'];

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
    <div className="items-select items-select-page" ref={dropdownRef}>
      <span className="label">Items on page</span>

      <div
        className={`select-box ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className="selected-value">{value}</span>
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
        {options.map(option => (
          <li
            key={option}
            className={`option ${option === value ? 'active' : ''}`}
            onClick={() => {
              onChange(option);
              setIsOpen(false);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
