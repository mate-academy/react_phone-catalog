import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.scss';

type Props = {
  onSortChange: (selectedSortType: string) => void;
};

export const CustomSelect: React.FC<Props> = ({ onSortChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Newest');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const value = target.getAttribute('data-value');
    const optionText = target.textContent;

    if (value) {
      setSelectedOption(optionText || 'Newest');
      setIsDropdownOpen(false);

      onSortChange(value);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select" ref={dropdownRef}>
      <p className="custom-select__label">Sort By</p>
      <div className="custom-select__dropdown-wrapper">
        <div
          className="custom-select__options"
          aria-label="Sort phones by"
          onClick={toggleDropdown}
        >
          {selectedOption}
        </div>
        {isDropdownOpen && (
          <div className="custom-select__dropdown">
            <div
              className="custom-select__option"
              data-value="newest"
              onClick={handleOptionClick}
            >
              Newest
            </div>
            <div
              className="custom-select__option"
              data-value="latest"
              onClick={handleOptionClick}
            >
              Latest
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
