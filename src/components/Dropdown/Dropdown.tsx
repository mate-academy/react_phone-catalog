import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.scss';

type Option = {
  value: string;
  label: string;
};

type Props = {
  id: string;
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

export const Dropdown = ({ id, label, value, options, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find(option => option.value === value);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (newValue: string) => {
    setIsOpen(false);
    onChange(newValue);
  };

  return (
    <div className={styles.dropdown} ref={rootRef}>
      <span className={styles.dropdown__label} id={`${id}-label`}>
        {label}
      </span>

      <button
        type="button"
        id={id}
        className={classNames(styles.dropdown__trigger, {
          [styles['dropdown__trigger--open']]: isOpen,
        })}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`${id}-label ${id}`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {selected?.label ?? value}
        <i
          className={classNames(
            'fas',
            isOpen ? 'fa-chevron-up' : 'fa-chevron-down',
            styles.dropdown__icon,
          )}
        ></i>
      </button>

      {isOpen && (
        <ul
          className={styles.dropdown__list}
          role="listbox"
          aria-labelledby={`${id}-label`}
        >
          {options.map(option => (
            <li key={option.value} role="option" aria-selected={false}>
              <button
                type="button"
                className={classNames(styles.dropdown__item, {
                  [styles['dropdown__item--selected']]: option.value === value,
                })}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
