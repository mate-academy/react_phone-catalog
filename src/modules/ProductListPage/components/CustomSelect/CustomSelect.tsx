import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import styles from './CustomSelect.module.scss';

type Option = {
  label: string;
  value: string | number;
  icon?: string;
};

type Props = {
  label: string;
  options: Option[];
  selected: string | number;
  onChange: (value: string | number) => void;
};

export const CustomSelect: React.FC<Props> = ({
  label,
  options,
  selected,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === selected);

  const toggle = () => setIsOpen(prev => !prev);

  const handleSelect = (value: string | number) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <span className={styles.label}>{label}</span>

      <div className={styles.selectBox} onClick={toggle}>
        {selectedOption?.icon && (
          <img src={selectedOption.icon} alt="" className={styles.icon} />
        )}
        <span>{selectedOption?.label}</span>
        <span className={styles.arrow}>▾</span>
      </div>

      {isOpen && (
        <ul className={styles.dropdown}>
          {options.map(option => (
            <li
              key={option.value}
              className={classNames(styles.option, {
                [styles.active]: option.value === selected,
              })}
              onClick={() => handleSelect(option.value)}
            >
              {option.icon && (
                <img src={option.icon} alt="" className={styles.icon} />
              )}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
