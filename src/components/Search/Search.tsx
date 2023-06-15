import React, { useContext } from 'react';
import './Search.scss';
import SearchIcon from '../../images/icons/Search.png';
import { SearchContext } from '../ContextProvider';

type Props = {
  placeholder: string,
};

export const Search: React.FC<Props> = ({ placeholder }) => {
  const searchContext = useContext(SearchContext);

  return (
    <div className="searchForm">
      <label className="searchForm__label">
        <input
          value={searchContext?.searchValue}
          type="Search"
          placeholder={placeholder}
          className="searchForm__input"
          onChange={
            (event) => searchContext?.setSearchValue(event.target.value)
          }
        />
        <img
          src={SearchIcon}
          alt="Search icon"
          className="searchForm__label__img"
        />
      </label>
    </div>
  );
};
