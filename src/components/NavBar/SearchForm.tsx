export const SearchForm = () => (
  <form className="search">
    <label className="search__bar">
      <input
        className="search__input"
        type="search"
        name="search"
        placeholder="Search in phones..."
      />
    </label>

    <div className="search__icon" />
  </form>
);
