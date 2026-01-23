import { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.scss';
import { asset } from '../../utils/asset';

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  label?: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
};

export default function Dropdown({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select...',
  style,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (val: string) => {
    onChange?.(val);
    setOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const valueName =
    options.find(option => option.value === value)?.label ?? placeholder;

  return (
    <div ref={ref} className={styles.dropdown} style={style}>
      {label && <div className={styles.dropdownLabel}>{label}</div>}

      <div
        className={`${styles.dropdownControl} ${open ? styles.focus : ''}`}
        onClick={() => setOpen(prev => !prev)}
      >
        {valueName}
        <img
          src={asset(`img/icons/${open ? 'arrow-up' : 'arrow-down'}.png`)}
          alt="Breadcrumbs Separator"
          className={styles.icon}
        />
      </div>

      {open && (
        <div className={styles.dropdownMenuBlock}>
          <ul className={styles.dropdownMenu}>
            {options.map(option => (
              <li
                key={option.value}
                className={`${styles.dropdownItem} ${option.value === value ? styles.selected : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
