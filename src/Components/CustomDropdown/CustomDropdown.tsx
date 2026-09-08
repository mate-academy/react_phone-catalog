import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import './CustomDropdown.scss';

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export const CustomDropdown: React.FC<Props> = ({
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = options.find(opt => opt.value === value)?.label || 'Select';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={classNames('catalog-sort', { 'dropdown-active': isOpen })}
      ref={dropdownRef}
    >
      <div
        className="catalog-sort__trigger"
        onClick={() => setIsOpen(prev => !prev)}
      >
        {selected}
      </div>

      <div
        className={classNames('catalog-sort__content', {
          'catalog-sort__content--open': isOpen,
        })}
      >
        {options.map(opt => (
          <div
            key={opt.value}
            className={classNames('catalog-sort-item', {
              active: opt.value === value,
            })}
            onClick={() => {
              onChange(opt.value);
              setIsOpen(false);
            }}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
};
