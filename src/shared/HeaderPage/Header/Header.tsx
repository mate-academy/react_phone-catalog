import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { RootState } from '../../../app/store/store';
import { ModalHeader } from '../ModalHeader/ModalHeader';
import Logo from '../../../images/logo/logo.svg';
import styles from './Header.module.scss';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export const Header: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isModal, setIsModal] = useState(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('query') || '',
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const favoriteItems = useSelector(
    (state: RootState) => state.favourites.items,
  );

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );
  const canSearch = ['/phones', '/tablets', '/accessories', '/favorites'].some(
    path => location.pathname === path,
  );

  useEffect(() => {
    setSearchValue(searchParams.get('query') || '');
  }, [location.pathname, searchParams]);

  useEffect(() => {
    if (!canSearch) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const nextParams = new URLSearchParams(searchParams);
      const query = searchValue.trim();

      if (query) {
        nextParams.set('query', query);
        nextParams.delete('page');
      } else {
        nextParams.delete('query');
      }

      if (nextParams.toString() !== searchParams.toString()) {
        setSearchParams(nextParams);
      }
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [canSearch, searchParams, searchValue, setSearchParams]);

  const toggleModal = () => {
    setIsModal(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setWindowWidth(width);

      if (width > 640) {
        setIsModal(false);
      }
    };

    if (isModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
    };
  }, [isModal]);

  return (
    <>
      <header className={styles.header} id="top">
        <div className={styles.header_container}>
          <div className={styles.header_block}>
            <NavLink to="/">
              <img
                src={Logo}
                alt="Nice gadgets logo"
                className={styles.header_logo}
              />
            </NavLink>
            <nav className={styles.header_nav}>
              <ul className={styles.header_list}>
                {navLinks.map(({ to, label }) => (
                  <li key={to} className={styles.header_item}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        classNames(styles.header_link, {
                          [styles.is_active]: isActive,
                        })
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {canSearch && (
                <label className={styles.header_search}>
                  <span className="is-hidden">Search products</span>
                  <span
                    className={styles.header_searchIcon}
                    aria-hidden="true"
                  ></span>
                  <input
                    type="search"
                    value={searchValue}
                    placeholder="Search"
                    className={styles.header_searchInput}
                    onChange={event => setSearchValue(event.target.value)}
                  />
                </label>
              )}

              <NavLink
                to="/favorites"
                role="button"
                className={({ isActive }) =>
                  classNames(styles.header_favourites, {
                    [styles.is_active]: isActive,
                  })
                }
              >
                <span className={styles.header_heartIcon}>
                  {favoriteItems.length > 0 && (
                    <span className={styles.header_countIcon}>
                      {favoriteItems.length}
                    </span>
                  )}
                </span>
              </NavLink>

              <NavLink
                to="/cart"
                role="button"
                className={({ isActive }) =>
                  classNames(styles.header_cart, {
                    [styles.is_active]: isActive,
                  })
                }
              >
                <span className={styles.header_cartIcon}>
                  {totalItems > 0 && (
                    <span className={styles.header_countIcon}>
                      {totalItems}
                    </span>
                  )}
                </span>
              </NavLink>
            </nav>

            <div className={styles.header_modalMenu}>
              <button
                type="button"
                className={classNames(styles.header_icon, {
                  [styles.header_icon_open]: !isModal,
                  [styles.header_icon_close]: isModal,
                })}
                onClick={toggleModal}
                aria-label={isModal ? 'Close menu' : 'Open menu'}
              ></button>
            </div>
          </div>
        </div>
      </header>

      {windowWidth <= 640 && (
        <ModalHeader onClose={toggleModal} isModal={isModal} />
      )}
    </>
  );
};
