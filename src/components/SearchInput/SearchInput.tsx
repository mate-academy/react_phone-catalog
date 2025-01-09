import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import themeStyles from '../../styles/utils/themeStyles';
import { useEffect, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import './SearchInput.scss';

export const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  const currentTheme = useSelector(
    (state: RootState) => state.currentTheme.theme,
  );

  const { search } = themeStyles(currentTheme === 'light-theme');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }

    setSearchParams(params);
  };

  // Resets the search field when changing the path
  useEffect(() => {
    if (prevPathname.current !== location.pathname) {
      inputRef.current!.value = '';
      setSearchParams(params => {
        params.delete('search');

        return params;
      });

      prevPathname.current = location.pathname;
    }
  }, [location.pathname, setSearchParams]);

  return (
    <div className="search" onClick={handleFocusInput}>
      <img src={search} alt="Search input" className="icon" />

      <input
        ref={inputRef}
        className="search__input"
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
      ></input>
    </div>
  );
};
