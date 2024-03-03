import React, { useCallback, useState } from 'react';
import './DropDown.scss';
import { Icon } from '../Icon';
import { Icons } from '../../types/Icons';
import { DropDownProps } from './types';

export function DropDown<T extends React.ReactNode>({
  title,
  defaultSelectedOption,
  selectOptions,
  onSubmit,
}: DropDownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultSelectedOption);

  const handleOptionClick
    = useCallback((option: T) => {
      setIsOpen(false);
      setSelected(option);
      onSubmit(option);
    }, [onSubmit]);

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <div className="dropdown">
      <p className="dropdown__title">{title}</p>
      <button
        type="button"
        className={`dropdown-selected ${isOpen ? 'open' : ''}`}
        onClick={toggleOpen}
      >
        {selected}
        <div className="dropdown-selected-arrow">
          <Icon icon={Icons.ArrowDown} />
        </div>
      </button>
      {isOpen && (
        <div className="dropdown__items">
          {selectOptions.map((option) => (
            <button
              type="button"
              className="dropdown__items-option"
              key={`${option}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
