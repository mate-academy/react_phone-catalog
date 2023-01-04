import React, {} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Search: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname.split('/');
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(useLocation().search);
  const searchInput = searchParams.get('searchInput') || '';

  return (
    <input
      type="text"
      className="header__input"
      value={searchInput}
      placeholder={`Search in ${pathname[1]}`}
      onChange={(event) => {
        searchParams.set('searchInput', event.target.value);
        navigate({
          search: searchParams.toString(),
        });
      }}
    />
  );
};
