import styles from './Search.module.scss';

const Search = () => {
  return (
    <label className={styles.search} aria-label="Search products">
      <input
        className={styles.search__input}
        type="search"
        placeholder="Search"
      />
    </label>
  );
};

export default Search;
