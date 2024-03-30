/* eslint-disable */
import {
  useSearchParams,
  NavLink,
  useLocation,
  // useParams,
} from 'react-router-dom';
import classNames from 'classnames';
import './MobileNavbar.scss';
import {
  // useCallback,
  useContext,
  useEffect,
  // useState
} from 'react';
// import debounce from 'lodash.debounce';
import { StateContext } from '../../AppContext';

type Props = {
  onClick: (trigger: boolean) => void;
};

const MobileNavbar: React.FC<Props> = ({ onClick }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  // const [searchQuery, setSearchQuery] = useState<string>('');

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('text-navbar', { 'selected-link-mob': isActive });

  const linkClassIcons = ({ isActive }: { isActive: boolean }) =>
    classNames({ 'selected-icons-mob': isActive });

  const location = useLocation();

  const { state } = useContext(StateContext);

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

  return (
    <div className="navbar-total-mob">
      <div className="logo-box-mob">
        <div className="ml-24 centrum">
          <img src="./img/icons/logo2.svg" alt="img" />
        </div>
        {/* <div className="greypillar"/> */}
        <div className="centrum close-button">
          <img
            src="./img/icons/closeBlack.svg"
            alt="img"
            onClick={() => onClick(false)}
          />
        </div>
      </div>
      {/* <div className="greyline" /> */}
      <div className="navbar-mob">
        <div className="navbar--flex-mob">
          {location.pathname !== '/cart' && (
            <div className="navbar-mob">
              <div
                className={classNames('navbar-box-item-mob', {
                  'selected-nav-mob': homeLinkClass(),
                })}
              >
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
              </div>

              <div
                className={classNames('navbar-box-item-mob', {
                  'selected-nav-mob': customLinkClass('phones'),
                })}
              >
                <NavLink to="/phones" className={linkClass}>
                  Phones
                </NavLink>
              </div>

              <div className="navbar-box-item-mob">
                <NavLink to="/tablets" className={linkClass}>
                  Tablets
                </NavLink>
              </div>

              <div className="navbar-box-item-mob">
                <NavLink to="/accessoires" className={linkClass}>
                  Accessoires
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="navbar-icons-mob">
        {/* {location.pathname !== '/' &&
          location.pathname !== '/cart' &&
          !productId && (
            <div className="navbar_icons-mob navbar_icons-mob--search navbar-icons-mob">
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
          )} */}

        {location.pathname !== '/cart' && (
          <NavLink to="/favourites" className={linkClassIcons}>
            <div className="navbar_icons-mob navbar-icons-mob">
              <img src="./img/icons/icon_1.svg" alt="img" />
              {state.favourites.length > 0 && (
                <div className="red-circle-box-mob">
                  <div className="red-circle">{state.favourites.length}</div>
                </div>
              )}
            </div>
          </NavLink>
        )}

        <NavLink to="/cart" className={linkClassIcons}>
          <div className="navbar_icons-mob navbar-icons-mob">
            <img src="./img/icons/icon_2.svg" alt="img" />
            {state.card.length > 0 && (
              <div className="red-circle-box-mob">
                <div className="red-circle">{state.card.length}</div>
              </div>
            )}
          </div>
        </NavLink>
      </div>
      {/* <div className="navbar_icons-mob navbar-icons-mob-small-screen">
        <img src="./img/icons/burger.svg" alt="img" />
        </div> */}
    </div>
  );
};

export default MobileNavbar;
