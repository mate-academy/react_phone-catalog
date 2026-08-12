import { useEffect, useId, useRef, useState } from 'react';

import { Icon } from '../Icon';
import styles from './Dropdown.module.scss';

export type DropdownOption = {
  value: string;
  label: string;
};

type Props = {
  label?: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  className?: string;
};

export const Dropdown = ({
  label,
  value,
  options,
  onChange,
  className = '',
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownId = useId();

  const labelId = `${dropdownId}-label`;
  const triggerId = `${dropdownId}-trigger`;
  const menuId = `${dropdownId}-menu`;

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    document.addEventListener('keydown', handleEscapePress);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, []);

  const handleSelect = (nextValue: string) => {
    if (nextValue !== value) {
      onChange(nextValue);
    }

    setIsOpen(false);
  };

  const rootClassName = [
    styles.dropdown,
    isOpen && styles.dropdownOpen,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClassName} ref={dropdownRef}>
      {label && (
        <p className={styles.label} id={labelId}>
          {label}
        </p>
      )}

      <button
        id={triggerId}
        className={styles.trigger}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={menuId}
        aria-labelledby={label ? `${labelId} ${triggerId}` : undefined}
        aria-label={label ? undefined : selectedOption?.label}
        onClick={() => setIsOpen(current => !current)}
      >
        <span className={styles.value}>
          {selectedOption?.label || 'Select'}
        </span>

        <Icon name={isOpen ? 'chevronUp' : 'chevronDown'} size={16} />
      </button>

      {isOpen && (
        <ul
          id={menuId}
          className={styles.menu}
          role="listbox"
          aria-labelledby={label ? labelId : triggerId}
        >
          {options.map(option => {
            const isSelected = option.value === value;

            return (
              <li className={styles.item} key={option.value}>
                <button
                  className={
                    isSelected
                      ? `${styles.option} ${styles.optionSelected}`
                      : styles.option
                  }
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
