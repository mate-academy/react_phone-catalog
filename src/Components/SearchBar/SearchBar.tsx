import './SearchBar.scss';
import '../Tabs/Tabs.scss';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

type Props = {
  location: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchBar: React.FC<Props> = ({ setSearchInput, location }) => {
  const [search, setSearch] = useState('');
  const debouncedValue: string = useDebounce<string>(search);

  useEffect(() => {
    setSearchInput(debouncedValue.toLocaleLowerCase());
  }, [debouncedValue]);

  useEffect(() => {
    setSearch('');
  }, [location]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="SearchBar__form"
    >
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        type="text"
        className="SearchBar__input"
        placeholder="Search in phones"
        value={search}
      />
      {
        search !== '' ? (
          <button
            onClick={() => {
              setSearch('');
            }}
            type="button"
            className="SearchBar__cancelBtn"
          >
            <img
              src="./assets/close.svg"
              alt="search"
              className="SearchBar__iconClose"
            />
          </button>
        ) : (
          <div className="SearchBar__searchIcon">
            <img src="./assets/search.svg" alt="searchIcon" />
          </div>
        )
      }
    </form>
  );
};
