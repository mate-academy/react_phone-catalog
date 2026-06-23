import './Dropdown.scss';
import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  options: Option[];
  paramName: string;
}

export const Dropdown: React.FC<Props> = ({ label, options, paramName }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedValue = searchParams.get(paramName) || options[0].value;
  const selectedOption = options.find(opt => opt.value === selectedValue);

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(paramName, value);
    setSearchParams(params);
    setIsOpen(false);
  };

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

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <span className="dropdown__label">{label}</span>
      <button
        type="button"
        className="dropdown__button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption?.label}
        <div className={`dropdown__arrow ${isOpen ? 'is-active' : ''}`} />
      </button>

      {isOpen && (
        <ul className="dropdown__list">
          {options.map(option => (
            <li
              key={option.value}
              className="dropdown__item"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
