import React, { useEffect, useRef, useState } from 'react';
import { ICON_PATHS } from '../../constants/IconPaths';

import styles from './CustomSelect.module.scss';

interface SelectOption {
  value: string;
  label: string;
}

type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
};

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHoveredIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) {
        return;
      }

      switch (event.key) {
        case 'Escape':
          setIsOpen(false);
          setHoveredIndex(-1);
          break;

        case 'ArrowDown':
          event.preventDefault();
          setHoveredIndex(prev => (prev < options.length - 1 ? prev + 1 : 0));
          break;

        case 'ArrowUp':
          event.preventDefault();
          setHoveredIndex(prev => (prev > 0 ? prev - 1 : options.length - 1));
          break;

        case 'Enter':
          event.preventDefault();
          if (hoveredIndex >= 0) {
            onChange(options[hoveredIndex].value);
            setIsOpen(false);
            setHoveredIndex(-1);
          }

          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hoveredIndex, options, onChange]);

  const handleOptionsClick = (optionsValue: string) => {
    onChange(optionsValue);
    setIsOpen(false);
    setHoveredIndex(-1);
  };

  return (
    <div className={styles.select} ref={selectRef}>
      <div
        className={`${styles.select__trigger} ${
          isOpen ? styles.select__triggerOpen : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.select__value}>{selectedOption?.label}</span>

        <div className={styles.select__arrow}>
          <img
            src={isOpen ? ICON_PATHS.arrowUp : ICON_PATHS.arrowDown}
            alt={isOpen ? 'Collapse' : 'Expand'}
            width="16"
            height="16"
          />
        </div>
      </div>

      {isOpen && (
        <div className={styles.select__dropdown}>
          {options.map((option, index) => (
            <div
              key={option.value}
              className={`${styles.select__option} ${
                hoveredIndex === index ? styles.select__optionHovered : ''
              } ${value === option.value ? styles.select__optionSelected : ''}`}
              onClick={() => handleOptionsClick(option.value)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
