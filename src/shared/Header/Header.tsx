import './Header.scss';

import classNames from 'classnames';
import { useContext, useMemo, FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import { icons } from '../../constants/icons';
import { Icon } from '../Icon';
import { navLinks } from '../../constants/navLinks';
// import debounce from 'lodash.debounce';
// import { getSearchWith } from '../../utils/getSearchWith';
import { Filter } from '../Filter';

/* type Param = string | number;
type Params = {
  [key: string]: Param[] | Param | null;
};
*/

const getActiveItem = ({ isActive }: { isActive: boolean }) =>
  classNames('header__item', { 'header__item--active': isActive });

const getActiveIcon = ({ isActive }: { isActive: boolean }) =>
  classNames('header__icon', { 'header__icon--active': isActive });

export const Header: FC = () => {
  const { cart, favorites, toggleMenu, isMenuOpen, theme, toggleTheme } =
    useContext(GlobalContext);

  // const location = useLocation();
  //const [query, setQuery] = useState('');
  //const [appliedQuery, setAppliedQuery] = useState('');
  // const [searchParams, setSearchParams] = useSearchParams();
  //const [query, setQuery] = useState('');
  // const query = searchParams.get('query') || '';
  const totalQuantity = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  /* const isShowSearch = useMemo(
    () =>
      ['/phones', '/tablets', '/accessories', '/favorites'].includes(
        location.pathname,
      ),
    [location.pathname],
  ); */

  /* const clearInput = useCallback(() => {
    //setQuery('');
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      newParams.delete('query');

      return newParams;
    });
  }, [setSearchParams]);
*/
  /* const setSearchWith = useCallback(
    (params: Params) => {
      //const newParams = new URLSearchParams(searchParams);
      const search = getSearchWith(params, searchParams);

      //params.set("userId", event.target.value);
      setSearchParams(search);
    },
    [searchParams, setSearchParams],
  );
*/
  /*
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newQuery = event.target.value.trim();

      setQuery(newQuery);

      if (newQuery.length > 0) {
        applyQuery(newQuery);
      } else if (newQuery.length === 0) {
        clearInput();
      }
    },
    [applyQuery, clearInput],
  );

  const applyQuery = useMemo(
    () =>
      debounce(
        (value: string) =>
          setSearchParams(getSearchWith({ query: value }, searchParams)),
        500,
      ),
    [searchParams, setSearchParams],
  );
*/

  /* const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      //setSearchWith({ query: event.target.value.trim() || null });

      setSearchWith({ query: event.target.value.trim() || null });
      //const params = new URLSearchParams(searchParams);
      //params.set("query", event.target.value);
      //setSearchParams(params);
      //setSearchParams(`?query=${event.target.value}`);
    },
    [setSearchWith],
  );*/

  /*useEffect(() => {
    clearInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
*/
  return (
    <div className="header">
      <Link to="/" className="header__logo-container">
        <Icon icon={icons.logo[theme]} />
      </Link>

      <div className="header__menu">
        <div className="header__list">
          {navLinks.map(link => (
            <NavLink to={link.path} key={link.title} className={getActiveItem}>
              {link.title}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="header__buttons-right">
        <Filter />

        <div onClick={toggleMenu} className="header__icon header__icon--menu">
          <Icon icon={isMenuOpen ? icons.close[theme] : icons.menu[theme]} />
        </div>

        <button
          className="header__icon header__switch-theme"
          onClick={toggleTheme}
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>

        <div
          className={classNames('header__buttons-wrapper', {
            'header__buttons-wrapper--bottom': isMenuOpen,
          })}
          onClick={() => {
            if (isMenuOpen) {
              toggleMenu();
            }
          }}
        >
          <NavLink className={getActiveIcon} to="/favorites">
            <div className="header__icon-wrapper">
              {favorites.length ? (
                <span className="header__quantity">{favorites.length}</span>
              ) : null}

              <Icon icon={icons.favorites[theme]} />
            </div>
          </NavLink>

          <NavLink className={getActiveIcon} to="/cart">
            <div className="header__icon-wrapper">
              <Icon icon={icons.shopping_cart[theme]} />

              {totalQuantity > 0 && (
                <span className="header__quantity">{totalQuantity}</span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
