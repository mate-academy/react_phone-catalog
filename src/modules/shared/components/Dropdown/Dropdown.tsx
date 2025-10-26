import { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import styles from './Dropdown.module.scss';

type DropdownOption = {
  value: string | number;
  label: string;
};

type Props = {
  options: DropdownOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
};

export const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  disabled = false,
  className,
  label
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Знаходимо вибраний елемент
  const selectedOption = options.find(option => option.value === value);

  // Закриття dropdown при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Закриття при натисканні Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string | number) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={cn(styles['dropdown-wrapper'], className)}>
      {label && (
        <label className={styles['dropdown-label']}>
          {label}
        </label>
      )}
      <div
        className={cn(styles['dropdown'], {
          [styles['dropdown--disabled']]: disabled,
          [styles['dropdown--open']]: isOpen,
        })}
        ref={dropdownRef}
      >
        <button
          type="button"
          className={styles['dropdown__button']}
          onClick={handleToggle}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={styles['dropdown__button-text']}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className={cn(styles['dropdown__arrow'], {
            [styles['dropdown__arrow--up']]: isOpen,
          })}>
            ▼
          </span>
        </button>

        {isOpen && (
          <ul
            className={styles['dropdown__menu']}
            role="listbox"
          >
            {options.map((option) => (
              <li
                key={option.value}
                className={cn(styles['dropdown__item'], {
                  [styles['dropdown__item--selected']]: option.value === value,
                })}
                onClick={() => handleSelect(option.value)}
                role="option"
                aria-selected={option.value === value}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
