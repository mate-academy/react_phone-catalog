import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import styles from './CustomSelect2.module.scss';
import classNames from 'classnames';
import { ArrowIcon } from '../icons';

export interface CustomSelectOption<T> {
  value: T;
  label: string;
  icon?: string;
  render?: () => React.ReactNode;
}

export interface CustomSelectProps<T> {
  options: CustomSelectOption<T>[];
  currentValue: T;
  onChange: (value: T) => void;
  description?: string;
  placeholder?: string;
}

const CustomSelect2 = <T,>({
  options,
  currentValue,
  placeholder = 'Select...',
  description,
  onChange,
}: CustomSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [dropUp, setDropUp] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const currentOption = useMemo(
    () => options.find(opt => opt.value === currentValue),
    [options, currentValue],
  );

  // Обробник вибору елемента
  const handleSelect = useCallback(
    (value: T) => {
      setIsOpen(false);
      onChange(value);
    },
    [onChange],
  );

  // auto-positioning
  const checkPosition = () => {
    const rect = containerRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const spaceBelow = window.innerHeight - rect.bottom;

    setDropUp(spaceBelow < 200); // 200px для списку
  };

  const open = useCallback(() => {
    checkPosition();
    setIsOpen(true);
  }, []);

  const close = () => setIsOpen(false);

  // Обробник кліку поза компонентом для закриття
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      close();
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
        close();

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
        open();
      }
    },
    [isOpen, hoveredIndex, options, handleSelect, open],
  );

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.description]: description,
      })}
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0} // Для фокусу клавіатурою
    >
      {/* Опис, якщо є */}
      {description && <div className={styles.description}>{description}</div>}

      {/* Головний елемент селекта */}
      <div
        className={classNames(styles.control, {
          [styles.focus]: isOpen,
        })}
        onClick={() => (isOpen ? close() : open())}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className={styles.label}>
          {currentOption ? (
            <>
              {currentOption.render
                ? currentOption.render()
                : currentOption.label}
            </>
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
          {/* {selectedLabel} */}
        </div>

        <div className={styles.arrow}>
          <ArrowIcon direction="down" />
        </div>
      </div>

      {/* Випадаючий список */}
      {isOpen && (
        <ul
          className={classNames(styles.options, {
            [styles.dropUp]: dropUp,
          })}
          ref={listRef}
          role="listbox"
        >
          {options.map((option, index) => (
            <li
              key={String(option.value)}
              className={classNames(styles.option, {
                [styles.hover]: hoveredIndex === index,
              })}
              onClick={() => handleSelect(option.value)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
              role="option"
              aria-selected={currentValue === option.value}
            >
              {option.render ? option.render() : option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect2;
