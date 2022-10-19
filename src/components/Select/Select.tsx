/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  title: string;
  options: string [];
  value: string;
  onChange: (option: string) => void;
};

export const Select:React.FC<Props> = ({
  title, options, value, onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toogle = () => {
    setIsOpen(current => !current);
  };

  return (
    <div className="select">
      <div className="select__title">{title}</div>
      <button
        type="button"
        className={classNames(
          'select__button',
          { 'select__button--isOpen': isOpen },
        )}
        onClick={toogle}
      >
        {value}
      </button>

      {isOpen && (
        <ul className="select__list">
          {options.map(option => (
            <li
              key={option}
              className="select__item"
              onClick={() => {
                onChange(option);
                toogle();
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
