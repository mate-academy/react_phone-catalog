import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import './Select.scss';

type SelectProps = {
  label: string;
  width: number;
  currentValue: string;
};

export const Select = ({
  label,
  width,
  children,
  currentValue,
}: React.PropsWithChildren<SelectProps>) => {
  const buttonEl = useRef<HTMLButtonElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      if (!dropdownOpen) {
        setDropdownOpen(false);
      }
    };

    document.body.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.body.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  if (!dropdownOpen) {
    buttonEl?.current?.blur();
  }

  return (
    <div className="select">
      <label className="select__label">{label}</label>
      <div style={{ width }} className="select__wrapper">
        <button
          onClick={() => setDropdownOpen(true)}
          ref={buttonEl}
          type="button"
          className="select__field"
        >
          <span className="select__active">{currentValue}</span>
        </button>

        <div
          className={classNames('select__dropdown', {
            'select__dropdown--active': dropdownOpen,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
