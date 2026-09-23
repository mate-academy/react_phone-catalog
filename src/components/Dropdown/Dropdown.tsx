import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { IconChevronDown } from '../Icons';
import styles from './Dropdown.module.scss';

export type DropdownOption = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  className?: string;
};

export const Dropdown = ({
  label,
  value,
  options,
  onChange,
  className,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      const wrapper = wrapperRef.current;

      if (wrapper && !wrapper.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const selected = options.find(option => option.value === value);

  return (
    <div className={cn(styles.dropdown, className)} ref={wrapperRef}>
      <span className={styles.label}>{label}</span>

      <button
        type="button"
        className={cn(styles.trigger, { [styles.triggerOpen]: isOpen })}
        onClick={() => setIsOpen(prev => !prev)}
        onKeyDown={event => {
          if (event.key === 'Escape') {
            setIsOpen(false);
          }
        }}
      >
        <span className={styles.triggerValue}>{selected?.label}</span>
        <IconChevronDown
          className={cn(styles.chevron, { [styles.chevronOpen]: isOpen })}
        />
      </button>

      {isOpen && (
        <ul className={styles.list}>
          {options.map(option => (
            <li key={option.value}>
              <button
                type="button"
                className={cn(styles.option, {
                  [styles.optionActive]: option.value === value,
                })}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
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
