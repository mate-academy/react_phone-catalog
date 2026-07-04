import { useEffect, useRef, useState } from 'react';
import styles from './SelectProduct.module.scss';

type Option = {
  label: string;
  value: string | number;
};

type SelectValue = string | number;

type Props = {
  label?: string;
  value: string | number;
  options: Option[];
  onChange: (value: SelectValue) => void;
};
export const SelectProduct = ({ label, value, options, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);

  const handleSelect = (val: string | number) => {
    onChange(val);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={styles.catalogSort}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={`${styles.select} ${open ? styles.open : ''}`} ref={ref}>
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setOpen(prev => !prev)}
        >
          <span className={styles.value}>{selected?.label}</span>

          <span className={styles.icon} />
        </button>

        <div className={styles.dropdown}>
          {options.map(opt => (
            <div
              key={opt.value}
              className={`${styles.option} ${
                opt.value === value ? styles.active : ''
              }`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
