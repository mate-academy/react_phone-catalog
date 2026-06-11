/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useEffect, useRef, useState } from 'react';

import arrowDown from '@/assets/svg/arrow-dropdown-gray.svg';

import styles from './CustomDropdown.module.scss';
//#endregion IMPORTS

//#region STYLES
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
//#endregion STYLES

//#region TYPES
interface Option {
  value: string;
  label: string;
}
//#endregion TYPES

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
  //#region STATE_&_HOOKS
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
  //#endregion STATE_&_HOOKS

  //#region RENDER
  return (
    <div className={dropdownWrapper} ref={dropdownRef}>
      <span className={dropdownLabel}>{label}</span>

      <button
        type="button"
        className={`${dropdownField} ${isOpen ? dropdownFieldActive : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{currentLabel}</span>
        <img
          src={arrowDown}
          className={`${dropdownArrow} ${isOpen ? dropdownArrowActive : ''}`}
          alt=""
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul className={dropdownList} role="listbox">
          {options.map(option => (
            <li
              key={option.value}
              className={`${dropdownItem} ${option.value === value ? dropdownItemActive : ''}`}
              role="option"
              aria-selected={option.value === value}
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
  //#endregion RENDER
};
