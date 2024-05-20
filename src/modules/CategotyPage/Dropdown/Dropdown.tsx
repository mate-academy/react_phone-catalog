import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Option } from '../../../types/Option';
import { IconDown, IconUp } from '../../shared/IconsSVG';

type Props = {
  title: string;
  defaultValue: string;
  options: Option[];
  setSelectValue: (value: string) => void;
  resetCurrentPage: () => void;
};

export const Dropdown: React.FC<Props> = ({
  title,
  options,
  defaultValue,
  setSelectValue,
  resetCurrentPage,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [select, setSelect] = useState(defaultValue);
  const [styles, setStyles] = useState<CSSProperties>({
    overflow: 'hidden',
    border: 'none',
  });
  const focus = useRef<HTMLDivElement>(null);

  const handleSelectItems = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;

    if (value !== select) {
      setSelect(value);
      setSelectValue(value);
      resetCurrentPage();
    }

    setOpenDropdown(false);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (openDropdown) {
      setStyles({ overflow: 'hidden', border: '1px solid #b4bdc3' });
    }

    if (!openDropdown) {
      setTimeout(() => {
        setStyles({ overflow: 'hidden', border: 'none' });
      }, 280);
    }

    return () => clearTimeout(timeout);
  }, [openDropdown]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (focus.current && !focus.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={focus}>
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
              <IconUp />
            </div>
          ) : (
            <div className="dropdown__move">
              <IconDown />
            </div>
          )}
        </button>

        <div className="dropdown__items" style={openDropdown ? {} : styles}>
          {options.map(option => (
            <button
              key={option.value}
              type="button"
              value={option.value}
              onClick={handleSelectItems}
              className="dropdown__item"
              style={openDropdown ? { height: '32px' } : { height: 0 }}
            >
              {option.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
