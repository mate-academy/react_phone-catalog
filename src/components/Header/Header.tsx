import React, { useCallback, useContext, useEffect } from 'react';
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { DispatchContext, StateContext } from '../../StateProvider';
import './Header.scss';

// eslint-disable-next-line
const debounce = (fn: (any), wait: number) => {
  let timer: NodeJS.Timeout;

  // eslint-disable-next-line
  return (...args: any) => {
    clearTimeout(timer);
    // eslint-disable-next-line
    timer = setTimeout(fn, wait, ...args);
  };
};

const Header:React.FC = () => {
  const { totalItems, favoritesLength, textInput } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const history = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const queryValue = searchParams.get('query') || '';

  const IsFavorite = location.pathname.split('/').length < 3;

  const { pathname } = location;
  const activePage = location.pathname.split('/')[1];
  const visibleInput = activePage !== '' && activePage !== 'cart' && IsFavorite;

  const setApplyQuery = (value: string) => {
    dispatch({ type: 'setAppliedQuery', text: value });
  };

  const applyQuery = useCallback(
    debounce(setApplyQuery, 1000),
    [],
  );

  const handleTextInput = (value: React.SetStateAction<string> | string) => {
    dispatch({ type: 'setTextInput', text: value });
    applyQuery(value.toString());

    if (value !== '') {
      searchParams.set('query', value.toString());
    } else {
      searchParams.delete('query');
    }

    history(`?${searchParams.toString()}`);
  };

  const handleChangeInput
    = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      const { value } = event.target;

      handleTextInput(value);
    };

  const clearInput = () => {
    dispatch({ type: 'clearInput', text: '' });
    dispatch({ type: 'setAppliedQuery', text: '' });
  };

  useEffect(() => {
    clearInput();
  }, [location.pathname]);

  useEffect(() => {
    dispatch({ type: 'setTextInput', text: queryValue });
  }, [pathname]);

  useEffect(() => {
    handleTextInput(queryValue);
  }, []);

  return (
    <header className="header">
      <section className="header__left">
        <Link to="/">
          <img className="header__logo" src="./img/LOGO.svg" alt="logo" />
        </Link>

        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <NavLink
                to="/"
                className="header__nav-link upperCase"
              >
                home
              </NavLink>
            </li>

            <li className="header__nav-item">
              <NavLink
                to="/phones"
                className="header__nav-link upperCase"
              >
                phones
              </NavLink>
            </li>

            <li className="header__nav-item">
              <NavLink
                to="/tablets"
                className="header__nav-link upperCase"
              >
                tablets
              </NavLink>
            </li>

            <li className="header__nav-item">
              <NavLink
                to="/accessory"
                className="header__nav-link upperCase"
              >
                accessory
              </NavLink>
            </li>
          </ul>
        </nav>
      </section>

      <section className="header__right">
        {visibleInput && (
          <div className="header__input-wrap">
            <input
              type="text"
              className="header__input"
              value={textInput}
              onChange={(event) => {
                handleChangeInput(event);
              }}
              placeholder={`Search in ${activePage}...`}
            />
            {textInput && (
              <i
                role="button"
                tabIndex={0}
                aria-label="input-close"
                className="header__input-close"
                onClick={clearInput}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    clearInput();
                  }
                }}
              />
            )}
          </div>
        )}

        <NavLink
          to="/favorites"
          className="header__link"
        >
          <div className="header__link-wrap">
            <img
              src="./img/icon/header_like.svg"
              className="header__link-img"
              alt="btn-like"
            />
            {favoritesLength > 0 && (
              <div className="header__link-img-count">
                {favoritesLength}
              </div>
            )}
          </div>

        </NavLink>
        <NavLink to="/cart" className="header__link">
          <div className="header__link-wrap">
            <img
              src="./img/icon/header_cart.svg"
              className="header__link-img"
              alt="link-img"
            />
            {totalItems > 0 && (
              <div className="header__link-img-count">
                {totalItems}
              </div>
            )}
          </div>
        </NavLink>
      </section>
    </header>
  );
};

export default Header;
