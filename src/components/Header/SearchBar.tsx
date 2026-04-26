import { useSearchParams } from 'react-router-dom';
import { useFilters } from '../../hooks/useFilters';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
import styles from './SearchBar.module.scss';

export const SearchBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { query } = useFilters();

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  return (
    <input
      type="search"
      className={styles.searchBar}
      placeholder="Search..."
      value={query}
      onChange={handleQueryChange}
    />
  );
};
