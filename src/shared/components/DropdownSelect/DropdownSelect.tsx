import React, { useEffect, useRef, useState } from 'react';
import { SelectOption } from '@/shared/types';
import { ArrowIcon } from '@/shared/assets/icons';

import cn from 'classnames';
import './DropdownSelect.scss';

type Props = {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
};

export const DropdownSelect: React.FC<Props> = ({
  label,
  value,
  options,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedOption =
    options.find(option => option.value === value) ?? options[0];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Escape toggle
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen]);

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div className={cn('dropdown-select', className)} ref={rootRef}>
      <span className="dropdown-select__label">{label}</span>

      <button
        type="button"
        className={cn('dropdown-select__trigger', {
          'dropdown-select__trigger--open': isOpen,
        })}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className="dropdown-select__value">
          {selectedOption?.label ?? ''}
        </span>
        <ArrowIcon
          className={cn('dropdown-select__arrow', {
            'dropdown-select__arrow--open': isOpen,
          })}
        />
      </button>

      {isOpen && (
        <ul className="dropdown-select__list" role="listbox">
          {options.map(option => (
            <li key={option.value} className="dropdown-select__item">
              <button
                type="button"
                className={cn('dropdown-select__option', {
                  'dropdown-select__option--selected':
                    option.value === selectedOption?.value,
                })}
                role="option"
                aria-selected={option.value === selectedOption?.value}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
