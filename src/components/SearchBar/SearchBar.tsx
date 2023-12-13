/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
// import React, { useState } from 'react';
import './SearchBar.scss';
import { useSearchParams } from 'react-router-dom';
import {
  SearchParams,
  getSearchWith,
} from '../../helpers/getFunctions/searchHelper';

type Props = {
  sectionName: string,
  className: string,
};

export const SearchBar: React.FC<Props> = ({ sectionName, className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryInput, setQueryInput] = useState('');
  const [isOpenInput, setIsOpenInput] = useState(false);

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const hanldeInputQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = {
      query: event.target.value,
      page: '1',
    };

    setQueryInput(event.target.value);

    setSearchWith(params);
  };

  return (
    <>
      <div className={`search-bar ${className}`}>
        <div className="search-bar__onDesktop">
          <input
            type="text"
            className="search-bar__input"
            onChange={(event) => hanldeInputQuery(event)}
            value={queryInput}
            placeholder={`Search in ${sectionName}...`}
          />

          <div className="icon__search search-bar__icon" />
        </div>

        <button
          onClick={() => setIsOpenInput(true)}
          className="search-bar__toggle-btn"
        >
          <div className="icon icon__search" />
        </button>

        <div
          className="search-bar__onMobile"
          style={{
            transform: `translateX(${isOpenInput ? '0' : '100%'})`,
          }}
        >
          <input
            type="text"
            className="search-bar__input search-bar__input"
            onChange={(event) => hanldeInputQuery(event)}
            value={queryInput}
            placeholder={`Search in ${sectionName}...`}
          />

          <button
            onClick={() => setIsOpenInput(false)}
            className="search-bar__toggle-btn"
          >
            <div className="icon icon__close" />
          </button>
        </div>
      </div>
    </>
  );
};
