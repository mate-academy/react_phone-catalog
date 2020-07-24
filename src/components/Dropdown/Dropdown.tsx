import React, { useState } from 'react';
import './Dropdown.scss';

type Props ={
  options: Option[];
  value: string;
  onChange: (selectValue: string) => void;
};

const Dropdown: React.FC<Props> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(option => option.value === value);

  // const toggle = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <>
      <div className="Dropdown">
        <div className="Dropdown__option">

          <button className="Dropdown__title" type="button" onClick={() => setIsOpen(true)}>
            {selectedOption?.title}
            {isOpen ? (
              <div className="Dropdown__title--open" />
            )
              : (
                <div className="Dropdown__title--close" />

              )}
          </button>
        </div>

        {isOpen && (
          <ul className="Dropdown__list">
            {options.map((option: Option) => (
              <li key={option.value}>
                <button
                  type="button"
                  className="Dropdown__item"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
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
