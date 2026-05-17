import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import s from './Dropdown.module.scss';
import arrowDownIcon from '@/assets/icons/arrow-down.svg';

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export const Dropdown: React.FC<Props> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
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
    <div
      className={s.dropdown}
      ref={dropdownRef}
    >
      <button
        type="button"
        className={s.dropdown__button}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected?.label}
        <span
          className={classNames(s.arrow, {
            [s.arrowOpen]: isOpen,
          })}
        >
          <img
            src={arrowDownIcon}
            alt="Previous page"
          />
        </span>
      </button>

      {isOpen && (
        <ul className={s.dropdown__list}>
          {options.map((option) => (
            <li
              key={option.value}
              className={classNames(s.dropdown__item, {
                [s.active]: option.value === value,
              })}
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
  );
};
