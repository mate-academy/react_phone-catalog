import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { getPublicPath } from '../../utils/getPublicPath';
import styles from './Dropdown.module.scss';

export interface DropdownOption {
  value: string;
  label: string;
}

interface Props {
  id: string;
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  className?: string;
}

export const Dropdown: React.FC<Props> = ({
  id,
  label,
  value,
  options,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const selectedIndex = Math.max(
    options.findIndex(option => option.value === value),
    0,
  );
  const selectedOption = options[selectedIndex];
  const labelId = `${id}-label`;
  const listboxId = `${id}-listbox`;

  useEffect(() => {
    if (isOpen) {
      listRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);

    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  const openDropdown = (index = selectedIndex) => {
    setHighlightedIndex(index);
    setIsOpen(true);
  };

  const closeDropdown = (restoreFocus = false) => {
    setIsOpen(false);

    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  };

  const selectOption = (index: number) => {
    const option = options[index];

    if (option && option.value !== value) {
      onChange(option.value);
    }

    closeDropdown(true);
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      openDropdown(selectedIndex);
    }
  };

  const handleListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex(index => (index + 1) % options.length);
        break;

      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex(
          index => (index - 1 + options.length) % options.length,
        );
        break;

      case 'Home':
        event.preventDefault();
        setHighlightedIndex(0);
        break;

      case 'End':
        event.preventDefault();
        setHighlightedIndex(options.length - 1);
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        selectOption(highlightedIndex);
        break;

      case 'Escape':
        event.preventDefault();
        closeDropdown(true);
        break;

      case 'Tab':
        setIsOpen(false);
        break;

      default:
        break;
    }
  };

  return (
    <div ref={dropdownRef} className={cn(styles.control, className)}>
      <span id={labelId} className={styles.label}>
        {label}
      </span>

      <div className={styles.selectWrapper}>
        <button
          ref={triggerRef}
          id={id}
          type="button"
          className={cn(styles.trigger, {
            [styles.triggerOpen]: isOpen,
          })}
          aria-labelledby={`${labelId} ${id}-value`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          onClick={() =>
            isOpen ? closeDropdown() : openDropdown(selectedIndex)
          }
          onKeyDown={handleTriggerKeyDown}
        >
          <span id={`${id}-value`} className={styles.value}>
            {selectedOption?.label}
          </span>
          <img
            src={getPublicPath('img/chevron-right.svg')}
            alt=""
            aria-hidden="true"
            className={cn(styles.chevron, {
              [styles.chevronOpen]: isOpen,
            })}
          />
        </button>

        {isOpen && (
          <div
            ref={listRef}
            id={listboxId}
            className={styles.options}
            role="listbox"
            tabIndex={-1}
            aria-labelledby={labelId}
            aria-activedescendant={`${id}-option-${highlightedIndex}`}
            onKeyDown={handleListKeyDown}
          >
            {options.map((option, index) => (
              <button
                key={option.value}
                id={`${id}-option-${index}`}
                type="button"
                role="option"
                tabIndex={-1}
                aria-selected={option.value === value}
                className={cn(styles.option, {
                  [styles.optionHighlighted]: highlightedIndex === index,
                })}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => selectOption(index)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
