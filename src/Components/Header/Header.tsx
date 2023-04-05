import { Nav } from '../../Pages/Nav/Nav';
import { Favorites } from '../Favorites/Favorites';
import { Logo } from '../Logo/Logo';

import './Header.scss';
import { useSearchParams } from 'react-router-dom';
import { updateSeachParams } from '../../Helpers/updateSearchParams';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  setIsMenu: (value: boolean) => void,
  isMenu: boolean,
};

export const Header: React.FC<Props> = ({ setIsMenu, isMenu }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState('');
  const [AppliedQuery, setAppliedQuery] = useState('');

  const debounce = (func: (value: string) => void, delay: number) => {
    let timerId: any;

    return (...args: any) => {
      clearTimeout(timerId);
      timerId = setTimeout(func, delay, ...args);
    };
  };

  const onAppliedQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  useEffect(() => {
    setSearchParams(updateSeachParams(searchParams, { query: AppliedQuery || null }));
  }, [AppliedQuery]);

  const onQueryChange = (value: string) => {
    setQuery(value),
    onAppliedQuery(value);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__wrapper">
          <button className="header__menu" onClick={() => setIsMenu(!isMenu)}>
            <img
              src={isMenu ? 'Images/cross-icon.png' : 'Images/menu-icon.png'}
              className="header__menu--icon"
              alt="menu icon"
            />
          </button>

          <Logo />
          <Nav />
        </div>

        <div style={{ display: 'flex' }}>
          <input type="text" value={query} onChange={(event) => onQueryChange(event.target.value)} />

          <Favorites />
        </div>
      </div>
    </header>
  );
};
