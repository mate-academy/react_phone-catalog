/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

import { useEffect, useRef, useState } from 'react';

import arrowDown from '@/assets/svg/arrow-dropdown-gray.svg';

import styles from './CustomDropdown.module.scss';

const {
  dropdownWrapper,
  dropdownLabel,
  dropdownField,
  dropdownFieldActive,
  dropdownArrow,
  dropdownArrowActive,
  dropdownList,
  dropdownItem,
  dropdownItemActive,
} = styles;

const {} = styles;

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export const CustomDropdown: React.FC<Props> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLabel = options.find(opt => opt.value === value)?.label || value;

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
    <div className={dropdownWrapper} ref={dropdownRef}>
      <span className={dropdownLabel}>{label}</span>

      <div
        className={`
          ${dropdownField}
          ${isOpen ? dropdownFieldActive : ''}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{currentLabel}</span>
        <img
          src={arrowDown}
          className={`
            ${dropdownArrow}
            ${isOpen ? dropdownArrowActive : ''}
          `}
          alt=""
        />
      </div>

      {isOpen && (
        <ul className={dropdownList}>
          {options.map(option => (
            <li
              key={option.value}
              className={`
                ${dropdownItem}
                ${option.value === value ? dropdownItemActive : ''}
              `}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
