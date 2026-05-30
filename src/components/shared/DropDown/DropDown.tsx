import React, { useCallback, useState } from 'react';
import './DropDown.scss';
import { Icon } from '../Icon';
import { icons } from '../../../constants/icons';

type Props = {
  label: string;
  selected: string;
  options: string[];
  onChange: (value: string) => void;
};

export const DropDown: React.FC<Props> = ({
  label,
  selected,
  options,
  onChange,
}) => {
  const optionsLabels: Record<string, string> = {
    age: 'Newest',
    alphabet: 'Alphabetically',
    price: 'Cheapest',
    all: 'All',
    4: '4',
    8: '8',
    16: '16',
  };
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = useCallback(
    () => setIsOpen(prevState => !prevState),
    [],
  );

  const handleOptionClick = useCallback(
    (value: string) => {
      onChange(value);
      setIsOpen(false);
    },
    [onChange],
  );

  return (
    <div className="dropdown">
      <div className="dropdown__title">{label}</div>

      <button className="dropdown__button" onClick={handleButtonClick}>
        <div className="dropdown__label">{optionsLabels[selected]}</div>
        <div className="dropdown__icon">
          <Icon icon={isOpen ? icons.arrowUp : icons.arrowDownLight} />
        </div>
      </button>

      {isOpen && (
        <ul className="dropdown__options">
          {options.map(option => (
            <li
              key={option}
              className="dropdown__option"
              onClick={() => handleOptionClick(option)}
            >
              {optionsLabels[option]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
