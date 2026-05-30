import React, { useState } from 'react';
import { ChevronDown } from '../Icons';
import './Select.scss';
import classNames from 'classnames';

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export const Select: React.FC<Props> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="custom-select" tabIndex={0} onBlur={() => setIsOpen(false)}>
      <div
        className="custom-select__trigger typography__button-text"
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find(option => option.value === value)?.label}
        <ChevronDown
          className={classNames('custom-select__icon', { open: isOpen })}
        />
      </div>
      {isOpen && (
        <div className="custom-select__options">
          {options.map(option => (
            <div
              key={option.value}
              className="custom-select__option typography__body"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
