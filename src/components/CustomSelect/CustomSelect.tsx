import { useState, useRef, useEffect } from 'react';
import './CustomSelect.scss';
import { useAppSelector } from '../../redux/store';

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  selTitle?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange,
  placeholder = 'Select...', selTitle = '' }) => {
  const currentTheme = useAppSelector(
    (state: { theme: { current: string; }; }) => state.theme.current);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className={`custom-select ${selTitle === 'Items on page' ? 'items_on_page' : ''}`} ref={dropdownRef}>
      <div className={`custom-select__description ${currentTheme}`}>{selTitle}</div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`custom-select__button ${currentTheme} ${isOpen ? 'custom-select__button--open' : ''}`}
      >
        <span className="custom-select__text">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg className="custom-select__icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d={isOpen ? "M18 15L12 9L6 15" : "M6 9L12 15L18 9"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={`custom-select__dropdown ${currentTheme}`}>
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
              className={`custom-select__option ${currentTheme} ${
                hoveredIndex === index ? 'custom-select__option--hovered' : ''
              } ${
                String(option.value) === String(value) ? 'custom-select__option--selected' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


export default CustomSelect;
