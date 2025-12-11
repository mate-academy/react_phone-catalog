import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.scss'; // або свій шлях
import classNames from 'classnames';

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
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find(opt => opt.value === value) || null;
  const currentLabel = selectedOption ? selectedOption.label : placeholder;

  // Закриття по кліку поза компонентом
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOpen = () => {
    if (disabled) return;
    setIsOpen(prev => !prev);

    if (!isOpen) {
      const currentIndex = options.findIndex(o => o.value === value);
      setFocusedIndex(currentIndex !== -1 ? currentIndex : 0);
    }
  };

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    // відкриття з клавіатури
    if (
      !isOpen &&
      (e.key === 'Enter' ||
        e.key === ' ' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp')
    ) {
      e.preventDefault();
      setIsOpen(true);
      const currentIndex = options.findIndex(o => o.value === value);
      setFocusedIndex(currentIndex !== -1 ? currentIndex : 0);
      return;
    }

    if (!isOpen) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => {
        if (prev === null) return 0;
        return prev + 1 < options.length ? prev + 1 : 0;
      });
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => {
        if (prev === null) return options.length - 1;
        return prev - 1 >= 0 ? prev - 1 : options.length - 1;
      });
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (focusedIndex !== null) {
        const option = options[focusedIndex];
        handleSelect(option);
      }
    }
  };

  return (
    <div
      ref={rootRef}
      className={`${styles.customSelect} ${className} `}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    >
      {label && <div className={styles.customSelect__label}>{label}</div>}

      <div
        className={`${styles.customSelect__controls} ${isOpen ? styles['customSelect__controls--open'] : ''}`}
        onClick={toggleOpen}
        role="button"
        aria-disabled={disabled}
      >
        <span
          className={classNames(
            currentLabel === placeholder
              ? styles.customSelect__placeholder
              : styles.customSelect__currentLabel,
          )}
        >
          {currentLabel}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={isOpen ? { transform: 'rotate(180deg)' } : {}}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.4715 5.52864C12.7318 5.78899 12.7318 6.2111 12.4715 6.47145L8.47149 10.4714C8.21114 10.7318 7.78903 10.7318 7.52868 10.4714L3.52868 6.47144C3.26833 6.2111 3.26833 5.78899 3.52868 5.52864C3.78903 5.26829 4.21114 5.26829 4.47149 5.52864L8.00008 9.05723L11.5287 5.52864C11.789 5.26829 12.2111 5.26829 12.4715 5.52864Z"
            fill="#B4BDC4"
          />
        </svg>
      </div>

      {isOpen && (
        <div className={styles.customSelect__options} role="listbox">
          {options.length === 0 && (
            <div className={styles.customSelect__option}>Немає опцій</div>
          )}

          {options.map((option, index) => {
            const isSelected = value === option.value;
            const isFocused = focusedIndex === index;

            const optionClassName = [
              styles.customSelect__option,
              isSelected ? styles['customSelect__option--selected'] : '',
              isFocused ? styles['customSelect__option--focused'] : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div
                key={option.value}
                role="option"
                aria-selected={isSelected}
                className={optionClassName}
                onMouseEnter={() => setFocusedIndex(index)}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
