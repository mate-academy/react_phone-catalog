import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.scss';
import cn from 'classnames/bind';


type SelectProps = {
  options: Option[];
  value: string;
  onChange: (SelectOptionValue: string) => void;
};

const Dropdown: React.FC<SelectProps> = ({ options, value, onChange }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(option => option.value === value);

  const handleClick = (e: MouseEvent): void => {
    if (ref.current && ref.current.contains(e.target as HTMLElement)) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);


  return (
    <>
      <div className={cn({ dropdown: !isOpen, 'dropdown--focus': isOpen })}>
        <div className="dropdown__option option" ref={ref}>
          <div
            className={cn('option__title option__title::after', { 'option__title--focus': isOpen })}
          >
            {selectedOption?.title}
          </div>
        </div>

        <ul className={cn('dropdown__list', { 'dropdown__list--opened': isOpen })}>
          {options.map((option: Option) => (
            <li key={option.value}>
              <button
                type="button"
                className={cn('dropdown__item',
                  { 'dropdown__item--selected': option.value === value })}
                onClick={() => {
                  onChange(option.value);
                }}
              >
                {option.title}
              </button>
            </li>
          ))}
        </ul>

      </div>
    </>
  );
};

export default Dropdown;
