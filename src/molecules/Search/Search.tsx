import s from './Search.module.scss';

const Search = () => {
  return (
    <label className={s.search} aria-label="Search products">
      <input
        className={s.search__input}
        type="search"
        placeholder="Search"
      />
    </label>
  );
};

export default Search;
