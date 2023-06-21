import {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { Option } from './Option';
import './Select.scss';

type SelectProps = {
  label: string;
  width: number;
  name: string;
  options: { [key: string]: string };
};

export const Select = ({
  label, width, name, options,
}: SelectProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const buttonEl = useRef<HTMLButtonElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: optionValue } = e.target;

    searchParams.set(name, optionValue);
    setSearchParams(searchParams);
  };

  const selected = options[searchParams.get(name) as string];

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
          <span className="select__active">{selected}</span>
        </button>

        <div
          className={classNames('select__dropdown', {
            'select__dropdown--active': dropdownOpen,
          })}
        >
          {Object.entries(options).map(([key, value]) => (
            <Option
              key={key}
              label={value}
              value={key}
              name={name}
              onOptionChange={handleChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
