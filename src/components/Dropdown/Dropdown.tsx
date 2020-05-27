import React, { useState } from 'react';
import './Dropdown.scss';
import cn from 'classnames/bind';


// const Phones = () => {
//   const [dropdownOptionId, setDropdownOptionId] = useState<number>(3);

// console.log('dropdownOptionId', dropdownOptionId);

//   return (
//     <>
//     <h1>Phones</h1>
//     <Dropdown
//       options={options}
//       value={dropdownOptionId}
//       onChange={(dropdownOptionId: number) => setDropdownOptionId(dropdownOptionId)}
//     />
// </>
//   )
// }

type DropdownProps = {
  options: Option[];
  value: number;
  onChange: (dropdownOptionId: number, dropdownOptionValue: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(option => option.id === value);

  return (
    <div className={cn('dropdown dropdown--sortBy', { 'dropdown--focus': isOpen })}>
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
            <li key={option.id}>
              <button
                type="button"
                className={cn('dropdown__item', { 'dropdown__item--selected': option.id === value })}
                onClick={() => onChange(option.id, option.value)}
              >
                {option.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
