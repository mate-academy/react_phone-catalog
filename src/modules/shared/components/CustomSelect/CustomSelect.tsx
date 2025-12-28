import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind'; // distinct from 'classnames' for simpler usage
import styles from './CustomSelect.module.scss';
import { useTheme } from '@/context/ThemeContext';

const cx = classNames.bind(styles);

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: Option[];
  value: string | null;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Choose an option',
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const optionsListRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const selectedOption = options.find((opt) => opt.value === value);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-scroll to focused item
  useEffect(() => {
    if (isOpen && focusedIndex !== null && optionsListRef.current) {
      const focusedElement = optionsListRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({
          block: 'nearest', // Scrolls just enough to bring it into view
          behavior: 'smooth',
        });
      }
    }
  }, [focusedIndex, isOpen]);

  const toggleOpen = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);

    // Reset focus to currently selected item on open
    if (!isOpen) {
      const currentIndex = options.findIndex((o) => o.value === value);
      setFocusedIndex(currentIndex !== -1 ? currentIndex : 0);
    }
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (!isOpen) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        setIsOpen(true);
        const currentIndex = options.findIndex((o) => o.value === value);
        setFocusedIndex(currentIndex !== -1 ? currentIndex : 0);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev === null || prev === options.length - 1 ? 0 : prev + 1
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev === null || prev <= 0 ? options.length - 1 : prev - 1
        );
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex !== null) {
          handleSelect(options[focusedIndex].value);
        }
        break;
    }
  };

  return (
    <div
      ref={rootRef}
      className={cx('select', className, { disabled })}
      data-theme={theme} // CSS handles the theme
      onKeyDown={handleKeyDown}
      // Accessibility attributes
      tabIndex={disabled ? -1 : 0}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls="select-listbox"
      aria-activedescendant={focusedIndex !== null ? `option-${focusedIndex}` : undefined}
    >
      {label && <span className={styles.select__label}>{label}</span>}

      <div
        className={cx('select__control', { open: isOpen })}
        onClick={toggleOpen}
      >
        <span className={cx('select__value', { placeholder: !selectedOption })}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {/* Arrow Icon */}
        <div className={cx('select__arrow', { rotated: isOpen })}>
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.4715 5.52864C12.7318 5.78899 12.7318 6.2111 12.4715 6.47145L8.47149 10.4714C8.21114 10.7318 7.78903 10.7318 7.52868 10.4714L3.52868 6.47144C3.26833 6.2111 3.26833 5.78899 3.52868 5.52864C3.78903 5.26829 4.21114 5.26829 4.47149 5.52864L8.00008 9.05723L11.5287 5.52864C11.789 5.26829 12.2111 5.26829 12.4715 5.52864Z" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div
          className={styles.select__menu}
          role="listbox"
          id="select-listbox"
          ref={optionsListRef}
        >
          {options.length === 0 ? (
            <div className={styles.select__empty}>No options</div>
          ) : (
            options.map((option, index) => {
              const isSelected = value === option.value;
              const isFocused = focusedIndex === index;

              return (
                <div
                  key={option.value}
                  id={`option-${index}`} // For aria-activedescendant
                  role="option"
                  aria-selected={isSelected}
                  className={cx('select__option', {
                    selected: isSelected,
                    focused: isFocused,
                  })}
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleSelect(option.value);
                  }}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  {option.label}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
