// Dropdown.tsx
import { useState, useEffect, useRef } from 'react';
import styles from './Dropdown.module.scss';

import chevronTop from '/icons/dropdown-chevron-top.svg';
import chevronButtom from '/icons/dropdown-chevron-buttom.svg';

interface DropdownProps {
  label: string;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  variant?: 'sort' | 'pagination';
}

export const Dropdown = ({
  label,
  options,
  selectedOption,
  onSelect,
  variant = 'sort',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelected = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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

  // ЯВНО ВИЗНАЧАЄМО КЛАС МОДИФІКАТОРА:
  const modifierClass =
    variant === 'pagination' ? styles.pagination : styles.sort;

  return (
    <div className={`${styles.block} ${modifierClass}`} ref={dropdownRef}>
      <span className={styles.label}>{label}</span>

      <div className={styles.dropdown}>
        <button type="button" className={styles.trigger} onClick={handleOpen}>
          <span>{selectedOption}</span>

          <span className={`${styles.icon} ${isOpen ? styles.iconActive : ''}`}>
            {isOpen ? (
              <img src={chevronTop} alt="chevron top" />
            ) : (
              <img src={chevronButtom} alt="chevron bottom" />
            )}
          </span>
        </button>

        {isOpen && (
          <ul className={styles.menu}>
            {options.map(option => (
              <li key={option}>
                <button
                  type="button"
                  className={`${styles.item} ${
                    option === selectedOption ? styles.itemSelected : ''
                  }`}
                  onClick={() => handleSelected(option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
