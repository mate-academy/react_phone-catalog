import React, { useEffect, useRef, useState } from 'react';
import styles from './CustomSelect.module.scss';

interface Option {
  value: string;
  label: string;
}
type Props = {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
};

export const CustomSelect: React.FC<Props> = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const selected = options.find(o => o.value === value);

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.customSelect} data-open={open} ref={wrapperRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(!open)}
      >
        <span>{selected?.label || 'Choose'}</span>
        <img src="/img/icons/ChevronArrowDown.svg" alt="" />
      </button>

      {open && (
        <ul className={styles.menu}>
          {options.map(opt => (
            <li
              key={opt.value}
              className={opt.value === value ? styles.active : ''}
              onClick={() => handleSelect(opt.value)}
            >
              {opt?.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
