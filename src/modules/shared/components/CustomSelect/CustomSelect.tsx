import { useEffect, useRef, useState } from 'react';
import styles from './CustomSelect.module.scss';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  customClass?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  options,
  onChange,
  customClass = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value) || options[0];
  const extraClass = customClass ? styles[customClass] || customClass : '';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.customSelect} ref={dropdownRef}>
      <div
        className={`${styles.customSelectSelector} ${extraClass} ${isOpen ? styles.customSelectSelectorActive : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption.label}
      </div>

      {isOpen && (
        <div className={styles.customSelectDropdown}>
          {options.map(opt => (
            <div
              key={opt.value}
              className={`${styles.customSelectDropdownItem} ${value === opt.value ? styles.customSelectDropdownItemSelected : ''}`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
