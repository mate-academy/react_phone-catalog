import React, { useCallback, useEffect, useState } from 'react';
import './Search.scss';
import { Icon } from '../../../shared/components/Icon';
import { useDebounce } from '../../../../hooks/useDebounce';

type Props = {
  className: string;
  placeholder: string;
  label: string;
  searchValue: string;
  onChange: (value: string) => void;
};

export const Search: React.FC<Props> = ({
  className,
  placeholder,
  label,
  searchValue,
  onChange,
}) => {
  const [newValue, setNewValue] = useState(searchValue);
  const debouncedSearch = useDebounce(onChange, 500);

  useEffect(() => {
    if (searchValue === '') {
      setNewValue('');
    }
  }, [searchValue]);

  const changeValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(e.target.value);
      setNewValue(e.target.value);
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
