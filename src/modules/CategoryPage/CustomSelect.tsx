import React, { useEffect, useRef, useState } from 'react';
import styles from './CategoryPage.module.scss';

type Option = { value: string; label: string };

interface Props {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  ariaLabel?: string;
}

export const CustomSelect: React.FC<Props> = ({
  id,
  value,
  onChange,
  options,
  ariaLabel,
}) => {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) {
        return;
      }

      if (!rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onDoc);

    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => {
    if (!open) {
      setHighlighted(null);
    }
  }, [open]);

  useEffect(() => {
    // keep highlighted in sync with current value
    const idx = options.findIndex(o => o.value === value);

    setHighlighted(idx >= 0 ? idx : null);
  }, [value, options]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setHighlighted(prev => {
        const next = prev === null ? 0 : Math.min(prev + 1, options.length - 1);

        return next;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
      setHighlighted(prev => {
        const next = prev === null ? options.length - 1 : Math.max(prev - 1, 0);

        return next;
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlighted !== null) {
        onChange(options[highlighted].value);
        setOpen(false);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  };

  const chooseValue = (valueOpt: string) => {
    onChange(valueOpt);
    setOpen(false);

    return;
  };

  return (
    <div
      className={styles.customSelect}
      id={id}
      ref={rootRef}
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        className={styles.customSelect__button}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen(s => !s)}
      >
        {options.find(o => o.value === value)?.label}
        <img
          src="/react_phone-catalog/img/icons/icon-chevron-arrow-down.png"
          alt=""
          className={styles.customSelect__arrow}
        />
      </button>
      {open && (
        <ul className={styles.customSelect__list} role="listbox" tabIndex={-1}>
          {options.map((opt, i) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`${styles.customSelect__item} ${
                opt.value === value ? styles['is-selected'] : ''
              } ${highlighted === i ? styles['is-highlighted'] : ''}`}
              onClick={() => {
                chooseValue(opt.value);
              }}
              onMouseEnter={() => setHighlighted(i)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
