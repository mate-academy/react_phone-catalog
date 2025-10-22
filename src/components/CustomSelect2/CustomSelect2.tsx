import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './CustomSelect2.module.scss'; // Підключення стилів
import classNames from 'classnames';

// Типизація для елементів селекта
interface SelectOption {
  value: string;
  label: string;
}

// Типизація для пропсів компонента
interface CustomSelectProps {
  options: SelectOption[];
  currentValue: string;
  placeholder?: string;
  description?: string; // Для елемента "Description"
  onChange: (value: string) => void;
}

const CustomSelect2: React.FC<CustomSelectProps> = ({
  options,
  currentValue,
  placeholder = 'Select...',
  description,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const selectedLabel =
    options.find(opt => opt.value === currentValue)?.label || placeholder;

  // Обробник вибору елемента
  const handleSelect = (value: string) => {
    setIsOpen(false);
    onChange(value);
  };

  // Обробник кліку поза компонентом для закриття
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
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

  // Обробка навігації клавіатурою (опціонально, але бажано для доступності)
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        setIsOpen(false);

        return;
      }

      if (isOpen) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          setHoveredIndex(prev => (prev < options.length - 1 ? prev + 1 : 0));
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          setHoveredIndex(prev => (prev > 0 ? prev - 1 : options.length - 1));
        } else if (event.key === 'Enter' && hoveredIndex !== -1) {
          handleSelect(options[hoveredIndex].value);
        }
      } else if (event.key === 'Enter' || event.key === 'Space') {
        event.preventDefault();
        setIsOpen(true);
      }
    },
    [isOpen, hoveredIndex, options],
  );

  return (
    <div
      className={classNames(styles['custom-select-wrapper'], {
        [styles['with-description']]: description,
      })}
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0} // Для фокусу клавіатурою
    >
      {/* Опис, якщо є */}
      {description && (
        <div className={styles['custom-select-description']}>{description}</div>
      )}

      {/* Головний елемент селекта */}
      <div
        className={classNames(styles['custom-select-control'], {
          [styles.focus]: isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className={styles['custom-select-label']}>{selectedLabel}</div>

        <div className={styles['custom-select-arrow']}>
          <img
            className={styles['custom-select-arrow__img']}
            src="src/images/icons/arrow-down.svg"
            alt="arrow down"
          />
        </div>
      </div>

      {/* Випадаючий список */}
      {isOpen && (
        <ul className={styles['custom-select-options']} role="listbox">
          {options.map((option, index) => (
            <li
              key={option.value}
              className={classNames(styles['custom-select-option'], {
                [styles.hover]: hoveredIndex === index,
              })}
              onClick={() => handleSelect(option.value)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
              role="option"
              aria-selected={currentValue === option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect2;
