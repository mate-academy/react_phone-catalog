import './Dropdown.scss';
import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  label: string;
  values: {};
  selected: string;
  setParam: (v: string) => void;
};

export const Dropdown: React.FC<Props> = ({
  label,
  values,
  selected,
  setParam,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (v: string) => {
    setParam(v);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <span className="dropdown-label">{label}</span>

      <div className="dropdown__wrapper">
        <button className="dropdown__select" onClick={() => setIsOpen(!isOpen)}>
          <p className="dropdown__select-title">{selected}</p>
          <span
            className={classNames('dropdown__select-icon icon', {
              'icon-down': !isOpen,
              'icon-up-gray': isOpen,
            })}
          />
        </button>
        {isOpen && (
          <ul className="dropdown__select-list">
            {Object.entries(values).map(([key, value]) => (
              <li key={key}>
                <button
                  className="dropdown__select-list-item"
                  onClick={() => handleSelect(key)}
                >
                  {value as React.ReactNode}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
