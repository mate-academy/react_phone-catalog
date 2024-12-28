import './Dropdown.scss';
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon';
import { iconsObject } from '../../../constants/iconsObject';

type DropdownProps = {
  label: string;
  selected: string;
  options: string[];
  onChange: (value: string) => void;
};

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  selected,
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => setIsOpen(prevState => !prevState);

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="dropdown">
      <span className="dropdown__label">{label}</span>
      <div className="dropdown__container">
        <button
          className={`dropdown__button ${isOpen ? 'dropdown__button--open' : ''}`}
          onClick={handleButtonClick}
        >
          {selected}
          <span className="dropdown__icon">
            <Icon icon={iconsObject.arrow_right__disabled} />
          </span>
        </button>
        {isOpen && (
          <ul className="dropdown__options">
            {options.map(option => (
              <li
                key={option}
                className="dropdown__option"
                onClick={() => handleOptionClick(option)}
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
