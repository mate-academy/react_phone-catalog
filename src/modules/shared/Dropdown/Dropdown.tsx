import {
  FC,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Icon } from '../Icon';
import { icons } from '../../../constants/icons.config';
import { GlobalContext } from '../../../context/GlobalContext';
import { DropdownProps } from './types/types';
import './Dropdown.scss';

export const Dropdown: FC<DropdownProps> = memo(
  ({ label, selected, options, onChange }) => {
    const { theme } = useContext(GlobalContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = useCallback(() => {
      setIsOpen(prev => !prev);
    }, []);

    const selectOption = useCallback(
      (value: string) => {
        onChange(value);
        setIsOpen(false);
      },
      [onChange],
    );

    const handleClickOutside = useCallback((event: MouseEvent) => {
      if (dropdownRef.current?.contains(event.target as Node)) {
        return;
      }

      setIsOpen(false);
    }, []);

    useEffect(() => {
      if (!isOpen) {
        return;
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, handleClickOutside]);

    const arrowIcon = icons[isOpen ? 'arrow_down' : 'arrow_right'][theme];

    return (
      <div ref={dropdownRef} className="dropdown">
        <div className="dropdown__label">{label}</div>

        <button
          className={`dropdown__button ${isOpen ? 'dropdown__button--open' : ''}`}
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className="dropdown__title">{selected}</span>
          <Icon icon={arrowIcon} className="dropdown__icon" />
        </button>

        {isOpen && (
          <ul className="dropdown__options" role="listbox">
            {options.map(option => (
              <li
                key={option}
                className="dropdown__option"
                role="option"
                onClick={() => selectOption(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

Dropdown.displayName = 'Dropdown';
