import { useState } from 'react';
import './DropDown.scss';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'alphabetically', label: 'Alphabetically' },
  { value: 'cheapest', label: 'Cheapest' },
];

export const DropDown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown__option" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption.label}
      </div>
      {isOpen && (
        <div className="options-container">
          {options.map(option => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={`option ${option.value === selectedOption.value ? 'selected' : ''}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
