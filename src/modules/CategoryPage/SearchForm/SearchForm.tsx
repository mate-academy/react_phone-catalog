import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import cn from 'classnames';
import { IconFur } from '../../shared/IconsSVG';
import { getSearchWith } from '../../../services/getSearchWith';

export const SearchForm = React.memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const [title, setTitle] = useState('' || query);
  const [focus, setFocus] = useState<boolean>(!!query);

  const applyQuery = useMemo(
    () => debounce(newQuery => setSearchParams(newQuery), 1000),
    [setSearchParams],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    const newQuery = { query: newTitle.toLowerCase() || null };

    setTitle(newTitle);
    applyQuery(getSearchWith(searchParams, newQuery));
  };

  const handleSetFocus = () => {
    if (title) {
      return;
    }

    setFocus(false);
  };

  return (
    <div className={cn('search', { focus })}>
      <form className={cn('search__form', { focus })}>
        <input
          type="text"
          className="search__input"
          placeholder="Search"
          value={title}
          onChange={handleQueryChange}
          onFocus={() => setFocus(true)}
          onBlur={handleSetFocus}
        />
        <IconFur />
      </form>
    </div>
  );
});
