import { useState } from 'react';
import styles from './Dropdown.module.scss';
import classNames from 'classnames';

type DropdownProps = {
  label: string;
  selectedOption: string;
  options: string[];
  onSelect: (value: string) => void;
};

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  selectedOption,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    return () => {
      onSelect(value);
      setIsOpen(false);
    };
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={styles.select}
      tabIndex={0}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <p className={styles.label}>{label}</p>
      <button
        className={classNames(styles.dropDownButton, { [styles.open]: isOpen })}
        onClick={toggleDropdown}
      >
        {selectedOption}
      </button>

      {isOpen && (
        <div
          className={`${styles.dropdownContent}
          ${isOpen ? styles.animate : ''}`}
        >
          {options.map(option => (
            <li
              key={option}
              className={styles.option}
              onClick={handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};
