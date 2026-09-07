import './Search.scss';

export const Search = () => {
  // const [query, setQuery] = useState('');

  return (
    <div className="box">

      <label htmlFor="search-query" className="search">

        <div className="search__field">
          <input
            // value={query}
            type="text"
            id="search-query"
            className="search__input"
            placeholder="Search in phones..."
            // onChange={event => setQuery(event.currentTarget.value)}
          />
          <img
            className="icon search__icon"
            src="../icons/Search.svg"
            alt="icon"
          />
        </div>

      </label>
    </div>
  );
};
