import { NavLink } from 'react-router-dom';
import {
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';
import Logo from '../../img/logo.svg';
// import Search from '../../img/Search.svg';
import Favorite from '../../img/favourites.svg';
import Basket from '../../img/group.svg';
import { useAppContext } from '../../components/Context';

export const Header = () => {
  const { prevCartPhonesArr, setPrevCartPhonesArr } = useAppContext();
  const { prevFavoriteArr } = useAppContext();
  const [urlState, setUrlState] = useState<string>();

  useEffect(() => {

  }, [prevCartPhonesArr]);

  useEffect(() => {
    if (!urlState) {
      const currentURL = window.location.href;
      const substrings = currentURL.split('/');

      if (substrings.includes('phones')) {
        setUrlState('phones');
      }

      if (substrings.includes('tablets')) {
        setUrlState('tablets');
      }

      if (substrings.includes('accessories')) {
        setUrlState('accessories');
      }
      // eslint-disable-next-line max-len
      if (!substrings.includes('accessories') && !substrings.includes('tablets') && !substrings.includes('phones')) {
        setUrlState('home');
      }
    }
  }, []);

  useEffect(() => {
    const savedValue = localStorage.getItem('savedCartName');

    if (savedValue) {
      setPrevCartPhonesArr(JSON.parse(savedValue));
    }
  }, []);

  const handleClick = (page: string) => {
    setUrlState(page);
  };

  return (
    <header className="header">
      <NavLink to="/" end>
        <img src={Logo} className="header__logo" alt="logo" />
      </NavLink>
      <nav className="nav">
        <ul className="nav__list">
          <NavLink
            to="/"
            className={cn(
              'nav__list__link',
              { underline: urlState?.includes('home') },
            )}
            onClick={() => handleClick('home')}
          >
            <li className="nav__list__link__text">
              Home
            </li>
          </NavLink>
          <NavLink
            to="phones"
            className={cn(
              'nav__list__link',
              { underline: urlState?.includes('phones') },
            )}
            onClick={() => handleClick('phones')}
          >
            <li className="nav__list__link__text">
              Phones
            </li>
          </NavLink>
          <NavLink
            to="tablets"
            className={cn(
              'nav__list__link',
              { underline: urlState?.includes('tablets') },
            )}
            onClick={() => handleClick('tablets')}
          >
            <li className="nav__list__link__text">
              Tablets
            </li>
          </NavLink>
          <NavLink
            to="accessories"
            className={cn(
              'nav__list__link',
              { underline: urlState?.includes('accessories') },
            )}
            onClick={() => handleClick('accessories')}
          >
            <li className="nav__list__link__text">
              Accessories
            </li>
          </NavLink>
        </ul>
      </nav>
      {/* <label className="header__search">
        <input
          type="text"
          placeholder="Search in phones..."
          className="header__search__input"
        />
        <a
          href="#"
          className="header__link"
        >
          <img
            src={Search}
            className="header__link-icon"
            alt="Search"
          />
        </a>
      </label> */}
      <NavLink
        to="favorite"
        className="header__link favorites"
      >
        {prevFavoriteArr && prevFavoriteArr.length > 0 && (
          <div className="header__link__pop-up">{prevFavoriteArr.length}</div>
        )}
        <img
          src={Favorite}
          className="header__link-icon"
          alt="Favorite"
        />
      </NavLink>
      <NavLink
        to="cart"
        // className="header__link__nav-link"
        className="header__link basket"
      >
        {prevCartPhonesArr && prevCartPhonesArr.length > 0 && (
          <div className="header__link__pop-up">{prevCartPhonesArr.length}</div>
        )}
        <img
          src={Basket}
          className="header__link-icon"
          alt=""
        />
      </NavLink>
    </header>
  );
};
