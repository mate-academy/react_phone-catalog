import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelper';

import { ReactComponent as IconDelete } from '../../images/icons/close.svg';
import { ReactComponent as IconSearch } from '../../images/icons/search.svg';

import './Search.scss';

interface Props {
  placeholder: string;
}

export const Search: React.FC<Props> = ({ placeholder }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  const clearSearch = () => {
    setSearchParams(getSearchWith(searchParams, { query: '' }));
  };

  return (
    <div className="search">
      <input
        data-cy="NameFilter"
        type="input"
        className="search__input"
        placeholder={placeholder}
        value={query}
        onChange={onQueryChange}
      />

      <div className="search__icon">
        {query ? (
          <IconDelete
            className="search__delete"
            onClick={clearSearch}
            data-cy="searchDelete"
          />
        ) : (
          <IconSearch />
        )}
      </div>
    </div>
  );
};
