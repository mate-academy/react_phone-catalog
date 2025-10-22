import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './CustomSelect.module.scss'; // Імпортуйте ваші стилі

interface CustomSelectProps {
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelectChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  selectedValue,
  onSelectChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    onSelectChange(value);
    setIsOpen(false);
  };

  // Закриття при кліку за межами компонента
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const selectedOptionLabel =
    options.find(option => option.value === selectedValue)?.label || '';

  return (
    <div
      ref={selectRef}
      className={classNames(styles.customSelect, { [styles.open]: isOpen })}
    >
      <div className={styles.selectedOption} onClick={handleToggle}>
        <span className={styles.currentOption}>{selectedOptionLabel}</span>
        <div
          className={classNames(styles.arrowDown, { [styles.up]: isOpen })}
        ></div>
      </div>

      <ul className={classNames(styles.options, { [styles.open]: isOpen })}>
        {options.map(option => (
          <li
            key={option.value}
            data-value={option.value}
            className={classNames({
              [styles.active]: option.value === selectedValue,
            })}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelect;
