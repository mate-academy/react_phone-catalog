import {
  Link,
  NavLink,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import './Header.scss';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  setSearchFilter,
} from '../../features/phonesSlice';
import { getSearchWith } from '../../helpers/searchHelper';
// import { TypeCard } from '../../types/TypeCard';

export const Header = (() => {
  const [searchParams, setSearchParams] = useSearchParams();

  // const urlParams = new URLSearchParams(window.location.search);
  // const queryValue: string = urlParams.get('query') || '';

  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchFilter = useAppSelector(
    (state) => state.phones.searchFilter,
  );

  const favouritesPhones = useAppSelector(
    (state) => state.favouritesPhones.favouritesPhones,
  );

  const cartPhones = useAppSelector(
    (state) => state.cartPhones.phonesInCart,
  );

  const headerText = ['', 'Phones', 'Tablets', 'Accessories'];

  const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    

    // dispatch(
    //   setSearchFilter(text),
    // );

    if (!text.trim()) {
      setSearchParams(getSearchWith(searchParams, { query: null }));

      return;
    }

    setSearchParams(getSearchWith(searchParams, { query: text }));
  };

  // const oldFav = localStorage.getItem('favourites') || '';
  // const newFav: TypeCard[] = JSON.parse(oldFav);

  // const oldCart = localStorage.getItem('cart') || '';
  // const newCart: TypeCard[] = JSON.parse(oldCart);

  return (
    <header className="header">
      <div className="header__leftContainer">
        <Link to="/" className="Logo">
          <img src="/img/logo.svg" alt="Logo" />
        </Link>

        <nav className="navigation">
          <ul className="navigation__list">
            {headerText.map(text => (
              <li className="navigation__item" key={text}>
                <NavLink
                  to={`/${text}`}
                  className={({ isActive }) => classNames({
                    active__link: isActive,
                  })}
                >
                  {text || 'Home'}
                </NavLink>

                <div className={classNames({
                  active__line: location.pathname === `/${text}`
                    || (
                      location.pathname.includes('Phones') && text === 'Phones'
                    ),
                })}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="header__rightContainer">
        {(location.pathname.includes('Phones')
          || location.pathname.includes('Favorites'))
          && (
            <div className="search">
              <input
                type="text"
                value={searchParams.get('query') || ''}
                className="search__input"
                placeholder={`Search in ${location.pathname.includes('Phones') ? 'phones' : 'favourites'}...`}
                onChange={(event) => handleInputSearch(event)}
              />

              {searchFilter.trim() ? (
                <button
                  type="button"
                  onClick={() => dispatch(
                    setSearchFilter(''),
                  )}
                  className="search__button"
                >
                  <img
                    src="/img/Close-dark.png"
                    alt="Search"
                    className="search__img"
                  />
                </button>
              ) : (
                <img
                  src="/img/Search.png"
                  alt="Search"
                  className="search__img"
                />
              )}
            </div>
          )}
        <NavLink
          to="/Favorites"
          className="category"
        >
          <div className={classNames({
            active__line: location.pathname === `/${'Favorites'}`,
          })}
          />
          <img src="/img/heart.png" alt="Favorites" />
          {favouritesPhones.length > 0
            && <div className="circle">{favouritesPhones.length}</div>}
        </NavLink>
        <NavLink
          to="/Cart"
          className="category"
        >
          <div className={classNames({
            active__line: location.pathname === `/${'Cart'}`,
          })}
          />
          <img src="/img/bag.png" alt="Cart" />
          {cartPhones.length > 0
            && <div className="circle">{cartPhones.length}</div>}
          {/* {phonesInCart.length > 0
            && <div className="circle">{phonesInCart.length}</div>} */}
        </NavLink>
      </div>
    </header>
  );
});
