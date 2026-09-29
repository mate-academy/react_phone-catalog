import React from 'react';
import classNames from '../../utils/classNames';
import './CapacityPicker.scss';

interface Props {
  options: string[];
  selected: string;
  onSelect: (capacity: string) => void;
  name?: string;
}

export const CapacityPicker: React.FC<Props> = ({
  options,
  selected,
  onSelect,
  name = 'capacity',
}) => {
  return (
    <ul className="capacity-picker">
      {options.map(option => (
        <li key={option}>
          <label
            className={classNames('capacity-picker__item', {
              'capacity-picker__item--active': option === selected,
            })}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={option === selected}
              onChange={() => onSelect(option)}
              className="capacity-picker__input"
            />
            {option}
          </label>
        </li>
      ))}
    </ul>
  );
};
