import { useContext, useState } from 'react';
import { MainContext } from '../../../context/MainContext';

export const HeaderSearch = () => {
  const { setQueryValue } = useContext(MainContext);
  const [value, setValue] = useState('');

  const search = (targetValue: string) => {
    const searchValue = targetValue.trim().toLowerCase();

    setQueryValue(searchValue);
    setValue(targetValue);
  };

  return (
    <form className="header__search">
      <input
        className="header__input"
        type="text"
        name="search"
        placeholder="Search in phones..."
        value={value}
        onChange={({ target }) => search(target.value)}
      />

      <span className="header__submit">
        <img src="./img/search.svg" alt="header-search" loading="lazy" />
      </span>
    </form>
  );
};
