import { useEffect, useRef, useState } from 'react';

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  defaultText: string;
};

export const CustomSelect: React.FC<Props> = ({
  options,
  value,
  onChange,
  label,
  defaultText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="custom-select" ref={selectRef}>
      <label htmlFor={label} className="sortOptions__label">
        {label}
      </label>
      <div
        className={`custom-select__header ${isOpen ? 'custom-select__header--rotated' : ''}`}
        id="sortSelect"
        onClick={() => setIsOpen(prev => !prev)}
        tabIndex={0}
      >
        {options.find(option => option.value === value)?.label || defaultText}
      </div>
      {isOpen && (
        <ul className="custom-select__options">
          {options.map(option => (
            <li
              key={option.value}
              className="custom-select__option"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
