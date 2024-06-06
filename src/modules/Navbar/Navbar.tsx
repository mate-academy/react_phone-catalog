import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../Store';
import { ColorChange } from './components/ColorChange';
import { SearchForm } from './components/SearchForm';

export const Navbar = () => {
  const { isMenuOpen, favourites, cart } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const location = useLocation();

  const handleOnClick = () => {
    dispatch({ type: 'toggleMenu' });
  };

  const addMenuStyle = () =>
    !isMenuOpen ? (
      <img
        className={classNames(styles.icons, styles['icons-bar'])}
        src="img/icons/Menu.svg"
        alt="Burger menu"
      />
    ) : (
      <img
        className={classNames(styles.icons, styles['icons--bar'])}
        src="img/icons/Close.svg"
        alt="Close menu"
      />
    );

  const renderSearchField = () => {
    if (
      location.pathname === '/phones' ||
      location.pathname === '/tablets' ||
      location.pathname === '/accessories'
    ) {
      return <SearchForm />;
    }

    return;
  };

  return (
    <div className={styles.topBar}>
      <Link className={styles.topBar__logo} to="/">
        <img src="img/Logo.svg" alt="Logo" />
      </Link>

      <div className={classNames(styles.topBar__menu, styles.menu)}>
        <nav className={styles.menu__nav}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link
                className={classNames(styles.menu__link, {
                  [styles['menu__link-active']]:
                    location.pathname === 'home' || location.pathname == '/',
                })}
                to={`/home`}
              >
                {'home'}
              </Link>
            </li>

            {['phones', 'tablets', 'accessories'].map(item => (
              <li className={styles.menu__item} key={item}>
                <Link
                  className={classNames(styles.menu__link, {
                    [styles['menu__link-active']]: location.pathname.startsWith(
                      `/${item.split('/')[0]}`,
                    ),
                  })}
                  to={item}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.topBar__icons}>
        {renderSearchField()}
        <ColorChange />
        <Link
          className={classNames(styles.topBar__icon, [
            styles['topBar__icon-favourite'],
            {
              [styles['topBar__icon-active']]:
                location.pathname === '/favourites',
            },
          ])}
          to="/favourites"
        >
          {!!favourites.length && (
            <span className={styles['topBar__icon-num']}>
              {favourites.length}
            </span>
          )}
        </Link>

        <Link
          className={classNames(styles.topBar__icon, [
            styles['topBar__icon-cart'],
            {
              [styles['topBar__icon-active']]: location.pathname === '/cart',
            },
          ])}
          to="/cart"
        >
          {!!cart.length && (
            <span className={styles['topBar__icon-num']}>{cart.length}</span>
          )}
        </Link>
      </div>

      <button className={styles.topBar__burgerMenu} onClick={handleOnClick}>
        {addMenuStyle()}
      </button>
    </div>
  );
};
