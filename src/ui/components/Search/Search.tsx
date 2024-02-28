import React, { useState } from 'react';
import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '../../base';

import { setSearchWith } from '../../../utils';

import './Search.scss';

type Props = {
  placeholder: string;
  className?: string;
};

export const Search: React.FC<Props> = ({ placeholder, className = '' }) => {
  const [isOpenSearch] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentQuery = { query: e.target.value || null };

    setSearchWith(searchParams, { ...currentQuery }, setSearchParams);
  };

  const handleClick = () => {
    if (query.length > 0) {
      const currentQuery = { query: null };

      setSearchWith(searchParams, { ...currentQuery }, setSearchParams);
    }
  };

  return (
    <div className={clsx('search', className && className)}>
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={handleChangeSearch}
        className={clsx(
          'search__input',
          isOpenSearch && 'search__input--opened',
        )}
      />
      <button
        type="button"
        className="search__button"
        onClick={handleClick}
        data-cy="searchDelete"
      >
        {query.length < 1 ? (
          <Icon id="search" width={14} height={14} className="search__icon" />
        ) : (
          <Icon id="cross" width={12} height={12} className="search__icon" />
        )}
      </button>
    </div>
  );
};
