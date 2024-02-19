import { useCallback, useState } from 'react';
import './DropDown.scss';
import { Icon } from '../Icon';
import { Icons } from '../../types/enums/Icons';

interface Props<T> {
  title: string;
  defaultSelectedOption: T;
  selectOptions: T[];
  onSubmit: (option: T) => void;
}

export function DropDown<T extends React.ReactNode>({
  title,
  defaultSelectedOption,
  selectOptions,
  onSubmit,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick
    = useCallback((option: T) => {
      setIsOpen(false);
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
        {defaultSelectedOption}
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
