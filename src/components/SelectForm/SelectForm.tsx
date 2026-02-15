import { useEffect, useRef, useState } from 'react';
import styles from './SelectForm.module.scss';

export interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export const SelectForm: React.FC<CustomSelectProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find(opt => opt.value === selectedValue)?.label || 'Select';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]); 


  return (
    <div className={styles.selectWrapper} ref={wrapperRef}>
      {label && <span className={styles.label}>{label}</span>}
      <div
        className={`${styles.selectTrigger} ${open ? styles.active : ''}`}
        tabIndex={0}
        onClick={() => setOpen(prev => !prev)}
      >
        {selectedLabel}
        <svg
          className={`${styles.icon} ${open ? styles.rotated : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.52876 3.52864C5.78911 3.26829 6.21122 3.26829 6.47157 3.52864L10.4716 7.52864C10.7319 7.78899 10.7319 8.2111 10.4716 8.47145L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00004L5.52876 4.47145C5.26841 4.2111 5.26841 3.78899 5.52876 3.52864Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {open && (
        <div className={styles.dropdown}>
          {options.map(opt => (
            <div
              key={opt.value}
              className={`${styles.option} ${opt.value === value ? styles.selected : ''}`}
              onClick={() => {
                setSelectedValue(opt.value);
                onChange(opt.value);
                setOpen(false);
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
