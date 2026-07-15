import React, { useCallback, useState } from 'react';
import './Search.scss';
import { Icon } from '../../../shared/components/Icon';

type Props = {
  className: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const debounce = (callback: (value: string) => void, delay: number) => {
  let timerId: NodeJS.Timeout;

  return (args: string) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(args);
    }, delay);
  };
};

export const Search: React.FC<Props> = ({
  className,
  placeholder,
  label,
  value,
  onChange,
}) => {
  const [newValue, setNewValue] = useState(() => value);
  const debouncedSearch = debounce(onChange, 500);

  const changeValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewValue(e.target.value);
      debouncedSearch(e.target.value);
    },
    [debouncedSearch],
  );

  return (
    <div className={`search ${className}`}>
      <label
        className="search__text"
        htmlFor="input-search"
      >{`${label}:`}</label>
      <div className="search__wrapper-input">
        <input
          id="input-search"
          type="text"
          className="search__input"
          placeholder={placeholder}
          value={newValue}
          onChange={e => changeValue(e)}
        />
        <Icon className="search__icon" name="search" />
      </div>
    </div>
  );
};
