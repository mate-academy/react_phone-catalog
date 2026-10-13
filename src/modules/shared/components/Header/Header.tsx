import { useEffect, useState } from 'react';
import { BurgerMenu } from './components/BurgerMenu';
import { NavLink, Link, useLocation, useSearchParams } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { useCart } from '../../../../context/CartContext';
import { useFav } from '../../../../context/FavouritesContext';
import { Search } from '../Search';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const { items } = useCart();
  const { favItems } = useFav();

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const setLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.nav__link, {
      [styles['nav__link--active']]: isActive,
    });
  };

  const setFavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.header__fav, {
      [styles['header__fav--active']]: isActive,
    });
  };

  const setCartLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.header__cart, {
      [styles['header__cart--active']]: isActive,
    });
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const pagesWithSearch = [
    '/phones',
    '/tablets',
    '/accessories',
    '/favourites',
  ];

  const showSearch = pagesWithSearch.includes(location.pathname);

  const handleSearchChange = (value: string) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      if (value) {
        params.set('query', value);
      } else {
        params.delete('query');
      }

      params.set('page', '1');

      return params;
    });
  };

  useEffect(() => {
    setSearchOpen(false);
  }, [location.pathname]);

  const handleBlur = () => {
    setSearchOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__content}>
          <div className={styles.header__content_left}>
            <Link className={styles.header__logo} to="/">
              <img
                className={styles.header__logo_img}
                src="img/logo/Logo.svg"
                alt="Nice Gadgets Logo"
              />
            </Link>
            {!searchOpen && (
              <nav className={styles.nav}>
                <ul className={styles.nav__list}>
                  <li className={styles.nav__item}>
                    <NavLink to={'/'} end className={setLinkClass}>
                      Home
                    </NavLink>
                  </li>
                  <li className={styles.nav__item}>
                    <NavLink to={'/phones'} className={setLinkClass}>
                      Phones
                    </NavLink>
                  </li>
                  <li className={styles.nav__item}>
                    <NavLink to={'/tablets'} className={setLinkClass}>
                      Tablets
                    </NavLink>
                  </li>
                  <li className={styles.nav__item}>
                    <NavLink to={'/accessories'} className={setLinkClass}>
                      Accessories
                    </NavLink>
                  </li>
                </ul>
              </nav>
            )}
          </div>

          <div className={styles.header__mobile}>
            {showSearch && (
              <span
                className={classNames(styles.header__search, {
                  [styles.header__search_disabled]: searchOpen,
                })}
                onClick={() => setSearchOpen(true)}
              ></span>
            )}

            {!searchOpen && (
              <div
                className={styles.header__burgermenu}
                onClick={() => setIsMenuOpen(true)}
              >
                <img src="img/icons/Menu.svg" alt="Burger Menu" />
              </div>
            )}
          </div>

          {searchOpen && (
            <Search
              value={query}
              onSearchChange={handleSearchChange}
              onBlur={handleBlur}
              searchOpen={searchOpen}
            />
          )}

          <div className={styles.header__content_right}>
            {showSearch && (
              <span
                className={classNames(styles.header__search, {
                  [styles.header__search_disabled]: searchOpen,
                })}
                onClick={() => setSearchOpen(true)}
              ></span>
            )}
            <NavLink to={'/favourites'} className={setFavLinkClass}>
              <img
                className={styles.header__fav_icon}
                src="img/icons/Favourites.svg"
                alt="Favourites"
              />
              {favItems.length > 0 && (
                <div className={styles.header__fav_counter}>
                  {favItems.length}
                </div>
              )}
            </NavLink>
            <NavLink to={'/cart'} className={setCartLinkClass}>
              <img
                className={styles.header__cart_icon}
                src="img/icons/Cart.svg"
                alt="Cart"
              />
              {items.length > 0 && (
                <div className={styles.header__cart_counter}>
                  {items.length}
                </div>
              )}
            </NavLink>
          </div>
        </div>
      </header>

      <BurgerMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </>
  );
};
