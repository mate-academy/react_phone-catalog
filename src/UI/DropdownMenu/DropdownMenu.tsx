import React, { useState, useEffect, useRef } from 'react';
import './DropdownMenu.scss';
import ArrowUp from '../../assets/icons/ArrowUp.svg';
import ArrowDown from '../../assets/icons/ArrowDown.svg';

interface DropdownMenuProps {
  options: string[];
  label?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ options, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      {label && <div className="dropdown__label">{label}</div>}
      <button className={`dropdown__toggle`} onClick={toggleDropdown}>
        {selectedOption}
        {isOpen ? (
          <img src={ArrowUp} className="arrowUp" alt="Arrow Up" />
        ) : (
          <img src={ArrowDown} className="arrowDown" alt="Arrow Down" />
        )}
      </button>
      {isOpen && (
        <ul className="dropdown__menu">
          {options.map((option, index) => (
            <li
              key={index}
              className={`dropdown__item`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
