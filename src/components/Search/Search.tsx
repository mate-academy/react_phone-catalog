import { useContext } from 'react';
import './search.scss';
import { MainContext } from '../../context';

export const Search = () => {
  const {
    currentPage,
    queryValue,
    setqueryValue,
  } = useContext(MainContext);

  return (
    <form className="header__search">
      <input
        type="text"
        name="search"
        className="header__input"
        placeholder={`Search in ${currentPage.toLowerCase()}...`}
        autoComplete="off"
        value={queryValue}
        onChange={(event) => setqueryValue(event.target.value)}
      />
      <div className="search__icon icon" />
    </form>
  );
};
