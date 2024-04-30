import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.scss';
import classNames from 'classnames';

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export const CustomSelect: React.FC<Props> = ({
  options,
  value,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
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
    <div
      className={classNames(`custom-select button ${className}`, {
        'custom-select--open': isOpen,
      })}
      ref={dropdownRef}
    >
      <div
        className={classNames('custom-select__selected', {
          open: isOpen,
        })}
        onClick={toggleDropdown}
      >
        {value}
      </div>
      <div
        className={classNames('custom-select__options body-text', {
          'custom-select__options--open': isOpen,
        })}
      >
        {options.map(option => (
          <div
            key={option.value}
            className="custom-select__option"
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};
