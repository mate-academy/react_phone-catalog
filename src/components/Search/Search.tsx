import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchWith';
import './Search.scss';

type Props = {
  pageName: string;
};

export const Search: React.FC<Props> = ({ pageName }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [newQuery, setNewQuery] = useState('');

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuery(event.target.value);
    setSearchParams(
      getSearchWith(searchParams, {
        query: event.target.value || null,
      }),
    );
  };

  const reset = () => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: null,
      }),
    );
    setNewQuery('');
  };

  return (
    <form className="search" data-cy="search">
      <input
        className="search__input"
        placeholder={`Search in ${pageName}...`}
        value={newQuery}
        onChange={(event) => handleQuery(event)}
      />
      {newQuery !== '' && (
        <button type="button" className="search__button" onClick={reset}>
          <span className="icon icon--cancel" />
        </button>
      )}

      {newQuery === '' && (
        <button type="button" className="search__button">
          <span className="icon icon--search" />
        </button>
      )}
    </form>
  );
};
