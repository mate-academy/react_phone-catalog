import './Search.scss';

export const Search = () => {
  return (
    <form className="search">
      <input
        type="text"
        className="search__input"
        placeholder="Search in phones..."
      />
    </form>
  );
};
