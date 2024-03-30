/* eslint-disable */
import { useSearchParams, NavLink, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import './navbar.scss';
import {
  useCallback,
  useContext, useEffect, useState
} from 'react';
import { StateContext } from '../../AppContext';
import debounce from 'lodash.debounce';
import MobileNavbar from '../MobileNavbar/MobileNavbar'; 

export const Navbar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>('');

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('text-navbar', { 'selected-link': isActive });

  const linkClassIcons = ({ isActive }: { isActive: boolean }) =>
    classNames({ 'selected-icons': isActive });

  const location = useLocation();

  const { state } = useContext(StateContext);

  const { productId } = useParams();

  function customLinkClass(filedName: string) {
    return location.pathname.includes(filedName);
  }

  function homeLinkClass() {
    return location.pathname === '/';
  }

  useEffect(() => {
    params.delete('search');
    setSearchParams(params);
  }, [location.pathname]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {

    applySearchDelayedQuery2(e.target.value);

    setSearchQuery(e.target.value);

  }

  console.log(location.pathname, location.search,'pathname inside navbar');

  const applySearchDelayedQuery2 = useCallback(
    debounce((search: string) => {
      if (!search) {
        params.delete('search');
      } else {
        params.set(`search`, search);
      }

      setSearchParams(params);
    }, 1000),
    [location.pathname],
  );

  function closeSearch() {
    params.delete('search');
    setSearchParams(params);
    setSearchQuery('');
  }

  console.log(location.pathname, params, showMobileMenu,'pathname navbr');

  if (showMobileMenu) {
    return <MobileNavbar onClick={setShowMobileMenu}/>
  }

  return (
    <div className="navbar-total">
      <div className="navbar">
        <div className="text-navbar--left navbar-box-item">
          <img src="./img/icons/logo2.svg" alt="img" />
        </div>

        <div className="navbar--flex">
        {location.pathname !== '/cart' && (
          <>
            <div
              className={classNames('navbar-box-item', {
                'selected-nav': homeLinkClass(),
              })}
            >
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
            </div>

            <div
              className={classNames('navbar-box-item', {
                'selected-nav': customLinkClass('phones'),
              })}
            >
              <NavLink to="/phones" className={linkClass}>
                Phones
              </NavLink>
            </div>

            <div className="navbar-box-item">
              <NavLink to="/tablets" className={linkClass}>
                Tablets
              </NavLink>
            </div>

            <div className="navbar-box-item">
              <NavLink to="/accessoires" className={linkClass}>
                Accessoires
              </NavLink>
            </div>
          </>
        )}
       </div>
      </div>

      <div className="navbar-icons">
        {(location.pathname !== '/' && location.pathname !== '/cart'
          && !productId) && (
          <div className="navbar_icon navbar_icon--search navbar-icons">
            <div className="search_box search-align search-align--input">
              <input
                className="search--input"
                placeholder={`Search in ${location.pathname.slice(1)}...`}
                value={searchQuery}
                onChange={e => handleSearch(e)}
              />
            </div>
            <div className="search-align search-align--search">
              {searchQuery.length > 0 ? (
                <img
                  src="./img/icons/closeBlack.svg"
                  alt="img"
                  onClick={closeSearch}
                />
              ) : (
                <img src="./img/icons/search.svg" alt="img" />
              )}
            </div>
          </div>
        )}

        {location.pathname !== '/cart' && (
          <NavLink to="/favourites" className={linkClassIcons}>
            <div className="navbar_icon navbar-icons">
              <img src="./img/icons/icon_1.svg" alt="img" />
              {state.favourites.length > 0 && (
                <div className="red-circle-box">
                  <div className="red-circle">{state.favourites.length}</div>
                </div>
              )}
            </div>
          </NavLink>
        )}

        <NavLink to="/cart" className={linkClassIcons}>
          <div className="navbar_icon navbar-icons">
            <img src="./img/icons/icon_2.svg" alt="img" />
            {state.card.length > 0 && (
              <div className="red-circle-box">
                <div className="red-circle">{state.card.length}</div>
              </div>
            )}
          </div>
        </NavLink>
        
      </div>
      <div className="navbar_icon navbar-icons-small-screen"
        onClick={() => setShowMobileMenu(true)}
      >
        <img src="./img/icons/burger.svg" alt="img" />
        </div>
    </div>
  );
};
