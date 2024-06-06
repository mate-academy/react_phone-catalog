import React, { useState, useEffect, useRef } from 'react';
import styles from './DropdownMenu.module.scss';
import ArrowUp from '../../assets/icons/ArrowUp.svg';
import ArrowDown from '../../assets/icons/ArrowDown.svg';

interface DropdownMenuProps {
  options: string[];
  label?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      {label && <div className={styles.dropdown__label}>{label}</div>}
      <button className={styles.dropdown__toggle} onClick={toggleDropdown}>
        {selectedOption}
        {isOpen ? (
          <img src={ArrowUp} className={styles.arrowUp} alt="Arrow Up" />
        ) : (
          <img src={ArrowDown} className={styles.arrowDown} alt="Arrow Down" />
        )}
      </button>
      {isOpen && (
        <ul className={styles.dropdown__menu}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.dropdown__item}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
