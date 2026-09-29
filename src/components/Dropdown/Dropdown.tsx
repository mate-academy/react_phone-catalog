import React from 'react';
import { Icon } from '../Icon';
import './Dropdown.scss';

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export const Dropdown: React.FC<Props> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <label className="dropdown">
      <span className="dropdown__label">{label}</span>

      <span className="dropdown__control">
        <select
          className="dropdown__select"
          value={value}
          onChange={event => onChange(event.target.value)}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <Icon name="chevron-down" className="dropdown__icon" />
      </span>
    </label>
  );
};
