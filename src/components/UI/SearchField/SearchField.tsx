import React, { memo } from 'react';

import './SearchField.scss';
import { useSearchField } from './useSearchField';

const SubmitButton: React.FC = memo(() => (
  <button type="submit" className="search-field__button">
    <img src="./img/icons/search-icon.svg" alt="Search" />
  </button>
));

export interface SearchFieldProps {
  className?: string,
}

export const SearchField: React.FC<SearchFieldProps> = memo((props) => {
  const {
    classes,
    handleFormSubmit,
    query,
    setQuery,
    searchIn,
  } = useSearchField(props);

  return (
    <form className={classes} onSubmit={handleFormSubmit}>
      <input
        type="text"
        className="search-field__input"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={`Search in ${searchIn || ''}...`}
        size={1}
      />

      <SubmitButton />
    </form>
  );
});
