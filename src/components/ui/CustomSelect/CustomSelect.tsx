import React, { useEffect, useRef, useState } from 'react';
import styles from './CustomSelect.module.scss';
import { Icon } from '../Icon';
import classNames from 'classnames';

type CustomSelectProps = {
  options: string[];
  label?: string;
  onSelect: (option: string) => void;
  value: string;
};

const CustomSelectComponent: React.FC<CustomSelectProps> = ({
  label,
  options,
  onSelect,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const placeHolder = label === 'page' ? 'All' : 'Sort by...';

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.customSelect} ref={dropdownRef}>
      <div
        className={classNames(
          'button-text',
          styles.customSelect__selectedOption,
        )}
        onClick={toggleDropdown}
      >
        {value ? value : placeHolder}
        {isOpen ? (
          <span className={styles['customSelect__arrow-icon']}>
            <Icon iconName="up" />
          </span>
        ) : (
          <span className={styles['customSelect__arrow-icon']}>
            <Icon iconName="down" />
          </span>
        )}
      </div>
      {isOpen && (
        <ul className={styles.customSelect__optionsList}>
          {options.map(option => (
            <li
              key={option}
              className={classNames(
                'body-text',
                styles.customSelect__optionItem,
              )}
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

export const CustomSelect = React.memo(CustomSelectComponent);
