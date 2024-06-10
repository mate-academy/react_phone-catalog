import React, { useState } from 'react';
import classNames from 'classnames';
import './Search.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/utils/getSearchWith';

type Props = {
  whereIsSearch: string;
};

export const Search: React.FC<Props> = ({ whereIsSearch }) => {
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchString = searchParams.get('query');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value || null;
    const params = getSearchWith({ query }, searchParams);

    setSearchParams(params);
  };

  const handleClear = () => {
    const params = getSearchWith({ query: null }, searchParams);

    setSearchParams(params);
  };

  return (
    <label
      htmlFor="search"
      className={classNames('search', { 'search--focus': isInputFocus })}
    >
      <input
        type="text"
        name="search"
        id="search"
        placeholder={`Search in ${whereIsSearch}...`}
        className="search__input"
        value={searchString || ''}
        onChange={handleChange}
        onFocus={() => setIsInputFocus(true)}
        onBlur={() => setIsInputFocus(false)}
      />
      {searchString ? (
        <button type="button" className="search__clear" onClick={handleClear}>
          clear
        </button>
      ) : (
        <div className="search__label" />
      )}
    </label>
  );
};
