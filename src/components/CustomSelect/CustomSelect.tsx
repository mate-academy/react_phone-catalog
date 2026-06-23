import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './CustomSelect.module.scss';

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export const CustomSelect: React.FC<Props> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

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

  const selectedLabel =
    options.find(option => option.value === value)?.label || 'Select';

  return (
    <label className={styles.customSelect__label}>
      <span>{label}</span>
      <div className={styles.customSelect__wrapper} ref={wrapperRef}>
        <div
          className={classNames(styles.customSelect__select, {
            [styles.open]: open,
          })}
          onClick={() => setOpen(prev => !prev)}
        >
          {selectedLabel}
          <img
            src="icons/arrow-dropdown.svg"
            alt="Dropdown arrow icon"
            className={classNames(styles.customSelect__dropdownArrow, {
              [styles.customSelect__dropdownArrowReverse]: open,
            })}
          />
        </div>

        {open && (
          <ul className={styles.customSelect__options}>
            {options.map(option => (
              <li
                key={option.value}
                className={classNames(styles.customSelect__option, {
                  [styles.customSelect__active]: option.value === value,
                })}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </label>
  );
};
