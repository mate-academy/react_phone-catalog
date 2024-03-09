/* eslint-disable react/require-default-props */
import React from 'react';

import './SelectDropdown.scss';

interface Option {
  key: string;
  value: string;
}

interface DropdownProps<T, K extends keyof T> {
  options: T[];
  selectedValue?: T[K];
  label?: string;
  onChangeOption: (v: string) => void;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const CustomDropdown = <T extends Option>(
  props: DropdownProps<T, keyof Option>,
) => {
  const { options, label, selectedValue, onChangeOption } = props;

  const handleSelectOption = (value: string) => {
    onChangeOption(value);
  };

  return (
    <div className="dropdown">
      {label && (
        <label htmlFor={`dropdown-${label}`} className="dropdown__label">
          {label}
        </label>
      )}

      <div className="dropdown__select-wrapper">
        <select
          className="dropdown__select"
          name={`dropdown-${label}`}
          id={`dropdown-${label}`}
          value={selectedValue}
          onChange={e => handleSelectOption(e.target.value)}
        >
          {options.map(option => (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
