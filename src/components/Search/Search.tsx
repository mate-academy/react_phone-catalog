import React, { useEffect, useState } from 'react';
import './Search.scss';
import { useSearchParams } from 'react-router-dom';
import SearchIcon from '../../images/icons/Search.png';
import { getSearchWith } from '../../utils/searchHelper';
import useDebounce from '../../hooks/useDebounce';

type Props = {
  placeholder: string,
};

export const Search: React.FC<Props> = ({ placeholder }) => {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  // const [appliedQuery, setAppliedQuery] = useState('');
  // const searchContext = useContext(SearchContext);

  // const applyQuery = useCallback(
  //   makeDebounce(setAppliedQuery, 1000),
  //   [],
  // );

  const debouncedSearch = useDebounce(query, 1000);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const getQuery = () => {
    const paramsToUpdate = {
      query: debouncedSearch,
    };

    setSearchParams(getSearchWith(searchParams, paramsToUpdate));
  };

  useEffect(() => {
    getQuery();
  }, [debouncedSearch]);

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
            handleQueryChange
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
