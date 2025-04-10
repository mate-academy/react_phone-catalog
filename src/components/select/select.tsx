import './select.scss';
import { useState, useRef, useEffect } from 'react';
import sliderDown from '../../images/slider-down.png';

interface CustomSelectProps {
  options: { value: string | number; label: string }[];
  selectedValue: string | number;
  onChange: (value: string | number) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string | number) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select" ref={selectRef}>
      <div
        className="custom-select__selected"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {options.find(option => option.value === selectedValue)?.label ||
            'Select'}
        </span>
        <img
          src={sliderDown}
          alt="Dropdown Arrow"
          className="custom-select__arrow"
        />
      </div>
      {isOpen && (
        <ul className="custom-select__options">
          {options.map(option => (
            <li
              key={option.value}
              className={`custom-select__option ${
                option.value === selectedValue ? 'selected' : ''
              }`}
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
