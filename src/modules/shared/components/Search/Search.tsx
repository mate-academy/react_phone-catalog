import { useFilters } from '../../../../store/FilterContext';
import styles from './Search.module.scss';

export const Search = () => {
  const { debouncedSearchQuery, handleSearchChange } = useFilters();

  return (
    <div className={styles.search__container}>
      <input
        type="search"
        placeholder="Пошук..."
        value={debouncedSearchQuery}
        onChange={e => handleSearchChange(e.target.value)}
        className={styles.search__input}
      />
    </div>
  );
};
