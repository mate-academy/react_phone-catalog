import React, { useEffect, useRef, useState, useCallback } from 'react';
import classNames from 'classnames';
import './Dropdown.scss';

interface Props {
  label: string;
  selected: string | number;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}

export const Dropdown: React.FC<Props> = ({
  label,
  selected,
  options,
  onChange,
  className,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  }, []);

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={`dropdown ${className}`} ref={dropdownRef}>
      <div className="dropdown__label">{label}</div>
      <button className="dropdown__button" onClick={toggleDropdown}>
        <div className="dropdown__text">{selected || 'Default'}</div>
        <div
          className={classNames('dropdown__icon', {
            'dropdown__icon--active': isOpen,
          })}
        />
      </button>

      <div
        className={classNames('dropdown__menu', {
          'dropdown__menu--active': isOpen,
        })}
      >
        {options
          .filter(option => option !== selected)
          .map(value => (
            <div
              key={value}
              className="dropdown__item"
              onClick={() => handleOptionClick(value)}
            >
              {value}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dropdown;
