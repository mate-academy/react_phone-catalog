import React, { CSSProperties, useEffect, useState } from 'react';
import { Option } from '../../../types/Option';

type Props = {
  title: string;
  defaultValue: string | number;
  options: Option[];
};

export const Dropdown: React.FC<Props> = ({ title, options, defaultValue }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [select, setSelect] = useState(defaultValue);
  const [styles, setStyles] = useState<CSSProperties>({
    overflow: 'hidden',
    border: 'none',
  });

  const handleSelectItems = (event: React.MouseEvent<HTMLButtonElement>) => {
    // const value = parseInt(event.currentTarget.value, 10);
    const { value } = event.currentTarget;

    setSelect(value);
    setOpenDropdown(false);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (openDropdown) {
      setTimeout(() => {
        setStyles({ overflow: 'hidden', border: '1px solid #b4bdc3' });
      }, 280);
    }

    if (!openDropdown) {
      setTimeout(() => {
        setStyles({ overflow: 'hidden', border: 'none' });
      }, 280);
    }

    return () => clearTimeout(timeout);
  }, [openDropdown]);

  return (
    <div className="dropdown">
      <span className="dropdown__title">{title}</span>
      <div className="dropdown__items-container">
        <button
          type="button"
          className="dropdown__selected"
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <div className="dropdown__selected-item">{select}</div>

          {openDropdown ? (
            <div className="dropdown__move">
              <img src="/img/icons/arrow-up.svg" alt="close" />
            </div>
          ) : (
            <div className="dropdown__move">
              <img src="/img/icons/arrow-down.svg" alt="open" />
            </div>
          )}
        </button>

        <div className="dropdown__items" style={openDropdown ? {} : styles}>
          {options.map(option => (
            <button
              key={option.value}
              type="button"
              value={option.label}
              onClick={handleSelectItems}
              className="dropdown__item"
              style={openDropdown ? { height: '32px' } : { height: 0 }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
