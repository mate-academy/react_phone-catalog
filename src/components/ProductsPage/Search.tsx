import React from 'react';
import { DebounceInput } from 'react-debounce-input';

interface Props {
  placeholderText: string;
  inputValue: string;
  setQuery: (value: string, option: string) => (void);
}

export const Search: React.FC<Props> = ({ placeholderText, inputValue, setQuery }) => {
  return (
    <>
      <DebounceInput
        minLength={2}
        debounceTimeout={1000}
        value={inputValue}
        onChange={(event) => setQuery(event.target.value, 'query')}
        className="search input"
        placeholder={`search in ${placeholderText}`}
        type="text"
      />
    </>
  );
};
