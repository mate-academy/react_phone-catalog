import React, { useState, useRef, useEffect } from 'react';
import './CustomSelectPage.scss';

type Props = {
  onItemsPerPageChange: (value: string) => void;
  currentItemsPerPage: string;
};

export const CustomSelectPage: React.FC<Props> = ({
  onItemsPerPageChange,
  currentItemsPerPage,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (value: string) => {
    onItemsPerPageChange(value);
    setIsDropdownOpen(false);
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
    <div className="custom-select-page" ref={dropdownRef}>
      <p className="custom-select-page__label">Items on page</p>
      <div className="custom-select-page__dropdown-wrapper">
        <div
          className="custom-select-page__options"
          aria-label="Items per page"
          onClick={toggleDropdown}
        >
          {currentItemsPerPage}
        </div>
        {isDropdownOpen && (
          <div className="custom-select-page__dropdown">
            <div
              className="custom-select-page__option"
              onClick={() => handleOptionClick('4')}
            >
              4
            </div>
            <div
              className="custom-select-page__option"
              onClick={() => handleOptionClick('8')}
            >
              8
            </div>
            <div
              className="custom-select-page__option"
              onClick={() => handleOptionClick('16')}
            >
              16
            </div>
            <div
              className="custom-select-page__option"
              onClick={() => handleOptionClick('all')}
            >
              All
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
