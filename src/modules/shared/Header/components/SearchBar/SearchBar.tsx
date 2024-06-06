/* eslint-disable max-len */
import React, { useCallback, useContext, useEffect, useState } from 'react';
// eslint-disable-next-line
import debounce from 'lodash.debounce';
import './SearchBar.scss';
import { getIconSrc } from '../../../../../helpers/getIconSrc';
import { ThemeContext } from '../../../../../contexts/ThemeContext/ThemeContext';
import { useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../../../../../utils/searchHelper';

export const SearchBar: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const [localQuery, setLocalQuery] = useState(query);

  const setSearchWith = useCallback(
    (params: SearchParams) => {
      const search = getSearchWith(params, searchParams);

      setSearchParams(search);
    },
    [searchParams, setSearchParams],
  );

  const debouncedSetSearchWith = useCallback(
    debounce(newValue => {
      setSearchWith({ query: newValue || null, page: '1' });
    }, 1000),
    [setSearchWith],
  );

  useEffect(() => {
    return () => {
      debouncedSetSearchWith.cancel();
    };
  }, [debouncedSetSearchWith]);

  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      setLocalQuery(newValue);
      debouncedSetSearchWith(newValue);
    },
    [debouncedSetSearchWith],
  );

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  return (
    <div className="searchBar">
      <input
        type="text"
        value={localQuery}
        placeholder="Search..."
        className="searchBar__input buttons-text"
        onChange={handleQueryChange}
      />
      {localQuery && (
        <button
          className="searchBar__closeBtn"
          onClick={() => {
            setSearchWith({ query: null, page: '1' });
            setLocalQuery('');
          }}
        >
          <img src={getIconSrc('close', theme)} alt="" className="icon" />
        </button>
      )}
    </div>
  );
};
