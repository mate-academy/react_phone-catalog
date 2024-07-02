import React from 'react';
import './NavSearch.scss';
import { useSearchParams } from 'react-router-dom';
import { SearchParamsType, getSearchWith } from '../../helpers/searchHelper';

type Props = {
  className?: string;
};

export const NavSearch: React.FC<Props> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  function setSearchWith(params: SearchParamsType) {
    setSearchParams(getSearchWith(searchParams, params));
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  return (
    <input
      type="search"
      className={`search ${className}`}
      value={query}
      placeholder={'Search...'}
      onChange={handleQueryChange}
    />
  );
};
