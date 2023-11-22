/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './search.scss';

type Props = {
  category: string;
};

export const Search: React.FC<Props> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isActive, setIsActive] = useState(false);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.set('query', event.target.value);

    setSearchParams(newSearchParams);

    if (event.target.value.trim() === '') {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const query = searchParams.get('query') || '';

  const handleQueryClear = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.delete('query');
    setSearchParams(newSearchParams);
    setIsActive(false);
  };

  return (
    <div className="search">
      <input
        className="search-placeholder"
        type="text"
        placeholder={`Search in ${category}...`}
        value={query}
        onChange={handleQueryChange}
      />
      <button
        type="button"
        data-cy="searchDelete"
        className={`${isActive ? 'search__icon-active' : 'search__icon'}`}
        onClick={handleQueryClear}
      />
    </div>
  );
};
