import classNames from 'classnames';
import { useEffect, useState } from 'react';
// import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/getSearchWith';
import { useDebounce } from '../../helpers/useDebounce';

type Props = {
  isHidden: boolean;
};

export const Searchbar: React.FC<Props> = ({ isHidden }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const searchDebounce = useDebounce(searchQuery, 300);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    setSearchParams(
      getSearchWith(searchParams, { query: searchDebounce || null }),
    );
  }, [searchDebounce]);

  return (
    <>
      <div className={classNames('searchbar', { isHidden })}>
        <img
          className="searchbar__img"
          src="/img/icons/search.png"
          alt="logo"
        />

        <input
          type="search"
          placeholder={`Search in ${location.pathname.slice(1)}`}
          className="searchbar__field"
          value={searchQuery}
          onChange={handleChange}
        />

      </div>
    </>
  );
};
