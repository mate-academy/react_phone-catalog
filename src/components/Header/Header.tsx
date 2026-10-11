export * from './Header';

import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { MobileMenu } from './MobileMenu';

import styles from './Header.module.scss';

import { FavoriteIcon } from '../Icons/FavoriteIcon';
import { CartIcon } from '../Icons/CartIcon/CartIcon';
import { MenuIcon } from '../Icons/MenuIcon/MenuIcon';
import { useCart, useFavorites } from '../../hooks';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { favoriteIds } = useFavorites();
  const { cartIds } = useCart();

  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const showSearch = ['/phones', '/tablets', '/accessories'].includes(pathname);

  const query = searchParams.get('query') || '';

  useEffect(() => {
    // Para não deixar rolar a tela quando o menu estiver aberto
    // 'esconde' meu body e html
    const overflow = isMenuOpen ? 'hidden' : '';

    document.documentElement.style.overflow = overflow;

    document.body.style.overflow = overflow;

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.header__nav}>
          {/* LOGO */}
          <div className={styles.header__logo}>
            <Link to="/" className={styles['header__logo-link']}>
              <img src="./logo/Logo.svg" alt="Phone catalog Logo" />
            </Link>
          </div>
          {/* PAGES */}
          <div className={styles.header__pages}>
            <NavLink to="/">home</NavLink>
            <NavLink to="/phones">phone</NavLink>
            <NavLink to="/tablets">tablets</NavLink>
            <NavLink to="/accessories">accessories</NavLink>
          </div>

          {/* Icones */}
          <div className={styles.header__actions}>
            {/* barra de pesquisa quando necessaria */}
            {showSearch && (
              <div
                className={`${styles.header__search} ${
                  isSearchOpen ? styles['header__search--open'] : ''
                }`}
              >
                <button
                  type="button"
                  className={styles.header__searchButton}
                  aria-label={isSearchOpen ? 'Close search' : 'Open search'}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <img src="./icons/Search.svg" alt="" />
                </button>

                <div className={styles.header__searchBox}>
                  <input
                    type="search"
                    placeholder="Search"
                    value={query}
                    onChange={event => {
                      setSearchParams(prev => {
                        const value = event.target.value;

                        if (value) {
                          prev.set('query', value);
                        } else {
                          prev.delete('query');
                        }

                        prev.delete('page');

                        return prev;
                      });
                    }}
                  />

                  <button
                    type="button"
                    aria-label="Close search"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
            {/* Ações para Tablet e Desktop */}
            <div className={styles['header__actions--desktop']}>
              <FavoriteIcon favorites={favoriteIds.length} />
              <CartIcon cartItens={cartIds.length} />
            </div>
            {/* Ação exclusiva do Mobile */}
            <div className={styles['header__actions--mobile']}>
              <MenuIcon isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            </div>
          </div>
        </nav>
      </header>

      {isMenuOpen && <MobileMenu setIsMenuOpen={setIsMenuOpen} />}
    </>
  );
};
