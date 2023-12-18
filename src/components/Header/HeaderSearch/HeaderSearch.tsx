import { useContext, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainContext } from '../../../context/MainContext';

export const HeaderSearch = () => {
  const { phones, setSearchItems } = useContext(MainContext);
  const [value, setValue] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchValue = value.trim().toLowerCase();

    if (searchValue.length === 0) {
      return;
    }

    const getSearchItems = phones.filter((phone) => {
      return phone.name.toLowerCase().includes(searchValue);
    });

    setSearchItems(getSearchItems);
    navigate('/search-result');
  };

  const isIconChange = useMemo(() => {
    return location.pathname === '/search-result' && value.length > 0;
  }, [value, location]);

  return (
    <form className="header__search" onSubmit={search}>
      <input
        className="header__input"
        type="text"
        name="search"
        placeholder="Search in phones..."
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />

      {isIconChange ? (
        <button
          data-cy="searchDelete"
          type="button"
          className="header__submit"
          onClick={() => setValue('')}
        >
          <img src="./img/close.svg" alt="header-close" loading="lazy" />
        </button>
      ) : (
        <button type="submit" className="header__submit">
          <img src="./img/search.svg" alt="header-search" loading="lazy" />
        </button>
      )}
    </form>
  );
};
