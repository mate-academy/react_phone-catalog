import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.scss';
import cn from 'classnames/bind';


type SelectProps = {
  options: Option[];
  value: string;
  onChange: (SelectOptionValue: string) => void;
};

const Dropdown: React.FC<SelectProps> = ({ options, value, onChange }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(option => option.value === value);

  const handleClick = (e: MouseEvent): void => {
    if (ref.current && ref.current.contains(e.target as HTMLElement)) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);


  return (
    <>
      <div className={cn('Dropdown', { 'Dropdown--focus': isOpen })}>
        <div className="Dropdown__Option Option">
          <p className="Option__Title">{selectedOption?.title}</p>
          <button
            type="button"
            className={cn('Option__Btn', { 'Option__Btn--focus': isOpen })}
            aria-label="Mute text"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        {isOpen && (
          <ul className="Dropdown__List">
            {options.map((option: Option) => (
              <li key={option.value}>
                <button
                  type="button"
                  className={cn('Dropdown__Item',
                    { 'Dropdown__Item--selected': option.value === value })}
                  onClick={() => {
                    setIsOpen(false);
                    onChange(option.value);
                  }}
                >
                  {option.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Dropdown;
