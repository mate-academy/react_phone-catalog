/* eslint-disable object-curly-newline */
import { useCallback, useContext, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { MainContext } from '../../../context/MainContext';

export const HeaderSearch = () => {
  const { setQueryValue } = useContext(MainContext);
  const [value, setValue] = useState('');
  const [appliedValue, setAppliedValue] = useState('');

  useEffect(() => setQueryValue(appliedValue), [appliedValue]);

  const applyQuery = useCallback(debounce(setAppliedValue, 1000), []);

  const search = (targetValue: string) => {
    const searchValue = targetValue.trim().toLowerCase();

    setValue(targetValue);
    applyQuery(searchValue);
    setQueryValue(appliedValue);
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
