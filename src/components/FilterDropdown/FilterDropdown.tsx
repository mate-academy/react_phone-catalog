import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import './FilterDropdown.scss';

type FilterOption = {
  label: string;
  value: string;
};

type FilterDropdownProps = {
  id: string;
  label: string;
  options: FilterOption[];
  initialValue: string;
  value?: string;
  onChange?: (value: string) => void;
};

export const FilterDropdown = ({
  id,
  label,
  options,
  initialValue,
  value,
  onChange,
}: FilterDropdownProps) => {
  const [internalSelectedValue, setInternalSelectedValue] =
    useState(initialValue);
  const selectedValue = value ?? internalSelectedValue;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const selectedIndex = Math.max(
    options.findIndex(option => option.value === selectedValue),
    0,
  );
  const selectedOption = options[selectedIndex];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !dropdownRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex, isOpen]);

  const openDropdown = (index = selectedIndex) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const selectOption = (index: number) => {
    const nextValue = options[index].value;

    if (value === undefined) {
      setInternalSelectedValue(nextValue);
    }

    onChange?.(nextValue);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      openDropdown();
    }
  };

  const handleOptionKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let nextIndex = activeIndex;

    switch (event.key) {
      case 'ArrowDown':
        nextIndex = (activeIndex + 1) % options.length;
        break;
      case 'ArrowUp':
        nextIndex = (activeIndex - 1 + options.length) % options.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = options.length - 1;
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        selectOption(activeIndex);

        return;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();

        return;
      case 'Tab':
        setIsOpen(false);

        return;
      default:
        return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
  };

  return (
    <div className="filter-item" ref={dropdownRef}>
      <span className="filter-name" id={`${id}-label`}>
        {label}
      </span>
      <button
        aria-controls={`${id}-options`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={`${id}-label ${id}-value`}
        className={`filter-select${isOpen ? ' is-open' : ''}`}
        id={id}
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
          } else {
            openDropdown();
          }
        }}
        onKeyDown={handleTriggerKeyDown}
        ref={triggerRef}
        type="button"
      >
        <span id={`${id}-value`}>{selectedOption.label}</span>
      </button>
      {isOpen && (
        <div
          aria-labelledby={`${id}-label`}
          className="filter-options"
          id={`${id}-options`}
          onKeyDown={handleOptionKeyDown}
          role="listbox"
        >
          {options.map((option, index) => (
            <div
              aria-selected={option.value === selectedValue}
              className="filter-select-item"
              key={option.value}
              onClick={() => selectOption(index)}
              ref={element => {
                optionRefs.current[index] = element;
              }}
              role="option"
              tabIndex={activeIndex === index ? 0 : -1}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
