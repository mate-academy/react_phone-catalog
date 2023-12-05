import './Search.scss';

export const Search = () => {
  return (
    <div className="search">
      <label htmlFor="" className="search__label">
        <input
          type="text"
          className="search__input"
          // value={query}
          // placeholder={`Search in ${searchField}...`}
          // onChange={onQueryChange}
        />
      </label>

    </div>
  );
};
