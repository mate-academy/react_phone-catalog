/* eslint-disable jsx-a11y/control-has-associated-label */
import { useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchKey } from '../types/SearchKey';

type Props = {
  category: string,
};

export const SearchBar: React.FC<Props> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const querryRef = useRef<HTMLInputElement>(null);
  const queryParams = searchParams.get(SearchKey.Querry) || '';

  const lowerCase = (word: string): string => {
    return word[0].toLowerCase() + word.slice(1);
  };

  const handleInput = () => {
    if (querryRef.current && querryRef.current.value) {
      searchParams.set(SearchKey.Querry, querryRef.current.value);
    } else {
      searchParams.delete(SearchKey.Querry);
    }

    setSearchParams(searchParams);
  };

  const handleQuerryClick = () => {
    if (querryRef.current) {
      querryRef.current.focus();
    }
  };

  const isActiveCross = useMemo(() => queryParams.length > 0, [queryParams]);

  const handleCrossButtonClick = () => {
    if (querryRef.current) {
      querryRef.current.value = '';
      searchParams.delete(SearchKey.Querry);
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="search-bar">
      <input
        ref={querryRef}
        className="search-bar__input"
        value={queryParams}
        placeholder={`Search in ${lowerCase(category)}...`}
        onChange={handleInput}
      />
      {isActiveCross && (
        <button
          type="button"
          className="search-bar__cross"
          onClick={handleCrossButtonClick}
        />
      )}

      <button
        type="button"
        className="search-bar__icon"
        onClick={handleQuerryClick}
      />
    </div>
  );
};
