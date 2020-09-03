import React, { useState, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import debounce from 'lodash.debounce';
import './SearchInput.scss';

const SearchInput = () => {
  const [inputValue, changeInputValue] = useState<string>('');
  const location = useLocation();
  const history = useHistory();
  const urlSearchParam = new URLSearchParams(location.search);

  const pushUrlSearchParam = (searchParam: string) => {
    if (searchParam) {
      urlSearchParam.set('searchQuery', searchParam);
    } else {
      urlSearchParam.delete('searchQuery');
    }

    history.push({
      search: urlSearchParam.toString(),
    });
  };

  const clearSearchField = () => {
    if (inputValue) {
      changeInputValue('');
      urlSearchParam.delete('searchQuery');
      history.push({
        search: urlSearchParam.toString(),
      });
    }
  };

  const debounceSearchParams = useCallback(
    debounce(pushUrlSearchParam, 500),
    [],
  );

  return (
    <div className="searchField">
      <input
        type="text"
        value={inputValue}
        className="searchField__input"
        onChange={({ target }) => {
          changeInputValue(target.value);
          debounceSearchParams(target.value);
        }}
      />
      <button
        type="button"
        className="searchField__button"
        onClick={() => clearSearchField()}
      >
        <img
          src={
            inputValue.length > 0
              ? './img/icons/header/Close.png'
              : './img/icons/header/Search.png'
          }
          alt="search"
        />
      </button>
    </div>
  );
};

export default SearchInput;
