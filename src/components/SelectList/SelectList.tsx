import React from 'react';

type Props = {
  options: string[];
  onSelect: (option: string) => void;
};

export const SelectList: React.FC<Props> = ({ options, onSelect }) => {
  return (
    <ul className="select__list">
      {options.map(option => (
        <li
          aria-hidden="true"
          key={option}
          className="select__item"
          onClick={() => onSelect(option)}
        >
          {option}
        </li>
      ))}
    </ul>
  );
};
