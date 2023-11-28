import React, { useEffect, useState } from 'react';
import './Search.scss';
import { useSearchParams } from 'react-router-dom';
import SearchIcon from '../../images/icons/Search.png';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  placeholder: string,
};

export const Search: React.FC<Props> = ({ placeholder }) => {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  // const searchContext = useContext(SearchContext);

  const getQuery = () => {
    const paramsToUpdate = {
      query,
    };

    setSearchParams(getSearchWith(searchParams, paramsToUpdate));
  };

  useEffect(() => {
    getQuery();
  }, [query]);

  // const getSelectedValue = () => {
  //   if (type === 'items-on-page') {
  //     const paramsToUpdate = {
  //       perPage: value,
  //       page: '1',
  //     };

  //     setSearchParams(getSearchWith(searchParams, paramsToUpdate));
  //   }
  // };

  return (
    <div className="searchForm">
      <label className="searchForm__label">
        <input
          value={query}
          type="Search"
          placeholder={placeholder}
          className="searchForm__input"
          onChange={
            (event) => setQuery(event.target.value)
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
