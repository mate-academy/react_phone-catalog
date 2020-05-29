import React, { useState } from 'react';
import './Dropdown.scss';
import cn from 'classnames/bind';

type SelectProps = {
  options: Option[];
  value: string;
  onChange: (SelectOptionValue: string) => void;
};

const Dropdown: React.FC<SelectProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(option => option.value === value);

  return (
    <>
      <div className={cn('dropdown', { 'dropdown--focus': isOpen })}>
        <div className="dropdown__option option">
          <p className="option__title">{selectedOption?.title}</p>
          <button
            type="button"
            className={cn('option__btn', { 'option__btn--focus': isOpen })}
            aria-label="Mute volume"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        {isOpen && (
          <ul className="dropdown__list">
            {options.map((option: Option) => (
              <li key={option.value}>
                <button
                  type="button"
                  className={cn('dropdown__item',
                    { 'dropdown__item--selected': option.value === value })}
                  onClick={() => {
                    setIsOpen(false);
                    onChange(option.value);
                  }}
                >
                  {option.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Dropdown;
