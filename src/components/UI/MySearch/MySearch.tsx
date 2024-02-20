import { Link, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { useState } from 'react';

import './MySearch.scss';
import { CategoryName } from '../../../types/product';
import { getSearchParamsWith } from '../../../helpers/searchParams';

type Props = {
  placeholder: CategoryName;
};

export const MySearch: React.FC<Props> = ({ placeholder }) => {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const appliedQuery = searchParams.get('query') || '';

  function setSearchWith(value: string) {
    const newParams = getSearchParamsWith({
      query: value || null,
      page: 1,
    }, searchParams);

    setSearchParams(newParams);
  }

  const applyQuery = debounce(setSearchWith, 500);

  return (
    <div className="my-search">
      <input
        placeholder={`Search in ${placeholder}`}
        type="text"
        className="my-search__input"
        value={query}
        onChange={event => {
          applyQuery(event.target.value);
          setQuery(event.target.value);
        }}
      />

      {appliedQuery
        ? (
          <Link
            to={{ search: getSearchParamsWith({ query: null }, searchParams) }}
            className="my-search__button"
            onClick={() => setQuery('')}
          >
            <img
              src="../../../img/icons/close.svg"
              alt="search icon"
              className="my-search__icon"
            />

          </Link>
        )
        : (
          <img
            src="../../../img/icons/search.svg"
            alt="search icon"
            className="my-search__button"
          />
        )}
    </div>
  );
};
