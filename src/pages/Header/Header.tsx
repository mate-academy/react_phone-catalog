/* eslint-disable */
import { NavLink, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import cn from 'classnames';
import Logo from '../../img/logo.svg';
import Search from '../../img/Search.svg';
import Favorite from '../../img/favourites.svg';
import Basket from '../../img/group.svg';
import MenuBurger from '../../img/Menu-burger.svg'
import { useAppContext } from '../../components/Context';
import Close from '../../img/Close-black.svg';

export const Header = () => {
  const { prevCartPhonesArr, setPrevCartPhonesArr } = useAppContext();
  const { prevFavoriteArr } = useAppContext();
  const { urlState, setUrlState } = useAppContext();
  const { setSelectedProduct } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { query, setQuery } = useAppContext();
  const { isMenuBurger, setIsMenuBurger } = useAppContext();

  const styles = {
    overflow: isMenuBurger ? 'hidden' : 'auto',
  };

  useEffect(() => {
    document.body.style.overflow = styles.overflow;
  }, [isMenuBurger]);

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

      if (substrings.includes('favorite')) {
        setUrlState('favorite');
      }

      if (substrings.includes('cart')) {
        setUrlState('cart');
      }

      // eslint-disable-next-line max-len
      if (!substrings.includes('accessories') && !substrings.includes('tablets') && !substrings.includes('phones') && !substrings.includes('favorite') && !substrings.includes('cart')) {
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
    setSelectedProduct('');
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    const isWhitespace = newText.trim() === '';
  
    if (!isWhitespace || newText === '') {
      setQuery(newText.toLowerCase());
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set('query', query);
      setSearchParams(params)
    } else {
      setSearchParams('')
    }
  }, [query])

  const handleCleanSearch = () => {
    if (query) {
      setQuery('');
    }
  };

  return (
    <>
    <header className="header">
      <NavLink to="/" data-cy="categoryLinksContainer" end>
        <img src={Logo} className="header__logo" alt="logo" />
      </NavLink>
      <nav className="nav" data-cy="categoryLinksContainer">
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
      {(urlState === 'phones' || urlState === 'tablets' || urlState === 'accessories' || urlState === "favorite") && (
      <label className="header__search">
        <input
          type="text"
          value={query}
          placeholder="Search in phones..."
          className="header__search__input"
          onChange={handleChangeQuery}
        />
        <button
          className="header__link"
          onClick={handleCleanSearch}
        >
          <img
            src={!query ? Search : Close}
            className="header__link-icon-search"
            alt="Search"
          />
        </button>
      </label>)}
      <NavLink
        to="favorite"
        className={cn(
          "header__link",
          " favorites ",
          { header__link__after: urlState?.includes('favorite') },
        )}
        onClick={() => handleClick('favorite')}
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
        className={cn(
          "header__link",
          "basket",
          { header__link__after: urlState?.includes('cart') },
        )}
        onClick={() => handleClick('cart')}
      >
        {prevCartPhonesArr && prevCartPhonesArr.length > 0 && (
          <div className="header__link__pop-up">{prevCartPhonesArr?.reduce((total, item) => total + item.count, 0)}</div>
        )}
        <img
          src={Basket}
          className="header__link-icon"
          alt=""
        />
      </NavLink>
      <div
        className={cn(
          "header__link",
          "basket",
          "display-none"
        )}
        onClick={() => setIsMenuBurger(!isMenuBurger)}
      >
        <img
          src={MenuBurger}
          className="header__link-icon"
          alt=""
        />
      </div>
    </header>
    </>
  );
};
