import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Dropdown.module.scss';

interface Option {
  label: string;
  value: string | number;
}

type DropdownProps = {
  label: string;
  value: string | number;
  options: Option[];
  onChange: (value: string | number) => void;
  width?: string;
};

export const Dropdown = ({
  label,
  value,
  options,
  onChange,
  width,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);

  // закриваємо при кліку поза дропдауном
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.group} style={{ width }}>
      <label className={styles.label}>{label}</label>
      <div ref={ref} className={styles.dropdown}>
        <button
          className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span>{selected?.label}</span>
          <ChevronDown
            size={16}
            className={`${styles.chevron} ${isOpen ? styles.chevronUp : ''}`}
          />
        </button>

        {isOpen && (
          <ul className={styles.menu}>
            {options.map(option => (
              <li
                key={option.value}
                className={`${styles.item} ${option.value === value ? styles.selected : ''}`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
