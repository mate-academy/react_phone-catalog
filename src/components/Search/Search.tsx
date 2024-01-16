import { useContext, useState } from 'react';
import './search.scss';
import { MainContext } from '../../context';

export const Search = () => {
  const {
    currentPage,
  } = useContext(MainContext);
  const [query, setQuery] = useState('');

  const handleSearchRequest = (event:React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.trim());
  };

  return (
    <form className="header__search">
      <input
        type="text"
        name="search"
        className="header__input"
        placeholder={`Search in ${currentPage.toLowerCase()}...`}
        autoComplete="off"
        value={query}
        onChange={handleSearchRequest}
      />
      <div className="search__icon icon" />
    </form>
  );
};
