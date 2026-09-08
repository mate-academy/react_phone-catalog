import styles from './Search.module.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchParams';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || 1;

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = getSearchWith(
      { query: event.target.value || null, page: page === 1 ? null : 1 },
      searchParams,
    );

    setSearchParams(params);
  }

  return (
    <div className={styles.search}>
      <img src="img/icons/search.svg" alt="search" />
      <input
        className={styles.search__input}
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleQueryChange}
      />
    </div>
  );
};
