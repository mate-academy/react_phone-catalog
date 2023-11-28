export const HeaderSearch = () => (
  <form className="header__search">
    <input
      className="header__input"
      type="text"
      name="search"
      placeholder="Search in phones..."
    />
    <button type="submit" className="header__submit">
      <img src="./img/search.svg" alt="header-search" loading="lazy" />
    </button>
  </form>
);
