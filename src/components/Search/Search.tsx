import styles from './Search.module.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchParams';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = getSearchWith(
      { query: event.target.value || null },
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
