import { useRef } from 'react';
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

  const onQueryParamsUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue) {
      searchParams.set(SearchKey.Querry, inputValue);
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

  return (
    <div className="search-bar">
      <input
        ref={querryRef}
        className="search-bar__input"
        value={queryParams}
        placeholder={`Search in ${lowerCase(category)}...`}
        onChange={onQueryParamsUpdate}
      />
      <div
        className="search-bar__icon"
        onClick={() => handleQuerryClick()}
      />
    </div>
  );
};
