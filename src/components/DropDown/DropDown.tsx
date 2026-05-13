import { useEffect, useRef, useState } from 'react';
import styles from './DropDown.module.scss';
import classNames from 'classnames';
import { Chevron } from '../icons/Chevron';

const ANIMATION_MS = 160;

export type DropdownOption<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  title: string;
  value: T;
  options: readonly DropdownOption<T>[];
  onChange: (value: T) => void;
};

export function Dropdown<T extends string>({
  title,
  value,
  options,
  onChange,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRender, setIsRender] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsRender(true);

      return;
    }

    const t = window.setTimeout(() => setIsRender(false), ANIMATION_MS);

    return () => window.clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) {
        return;
      }

      if (!dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selected = options.find(o => o.value === value);
  const buttonLabel = selected ? selected.label : value;
  const listboxId = `${title.replace(/\s+/g, '-').toLowerCase()}-listbox`;

  const handleSelect = (nextValue: T) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <p className={styles.dropdown__title}>{title}</p>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        className={classNames(styles.dropdown__button, {
          [styles.dropdown__buttonActive]: isOpen,
        })}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className={styles.dropdown__value}>{buttonLabel}</span>
        <span className={styles.dropdown__chevron}>
          <Chevron direction={isOpen ? 'up' : 'down'} />
        </span>
      </button>
      {isRender && (
        <ul
          id={listboxId}
          role="listbox"
          className={classNames(
            styles.dropdown__content,
            isOpen ? styles.open : styles.closed,
          )}
        >
          {options.map(option => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              onClick={() => handleSelect(option.value)}
              className={styles.dropdown__option}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
