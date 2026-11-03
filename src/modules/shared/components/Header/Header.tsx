import { Link, NavLink, useSearchParams } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Menu } from '../Menu';
import { useCart } from '../../../../context/CartContext';
import { useFavourites } from '../../../../context/FavouritesContext';
import { useActiveCategory } from '../../../../hooks/useActiveCategory';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('query') || '';

  const { totalCount } = useCart();
  const { favouritesCount } = useFavourites();

  const activeCategory = useActiveCategory();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (value.trim() === '') {
      newParams.delete('query');
    } else {
      newParams.set('query', value);
    }

    newParams.delete('page');

    setSearchParams(newParams);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const input = event.currentTarget.querySelector(
      'input',
    ) as HTMLInputElement;

    if (input) {
      input.blur();
    }
  };

  const getCategoryLinkClass = (categoryName: string) => {
    return ({ isActive }: { isActive: boolean }) => {
      return classNames(styles.navLink, {
        [styles.isActive]: isActive || activeCategory === categoryName,
      });
    };
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.navLink, { [styles.isActive]: isActive });
  };

  const logoSrc = isMenuOpen
    ? './img/icons/logo-dark.svg'
    : './img/icons/logo.svg';

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            <img src={logoSrc} alt="Nice Gadgets Logo" />
          </Link>

          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li>
                <NavLink to="/" className={getLinkClass}>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/phones"
                  className={getCategoryLinkClass('phones')}
                >
                  Phones
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/tablets"
                  className={getCategoryLinkClass('tablets')}
                >
                  Tablets
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/accessories"
                  className={getCategoryLinkClass('accessories')}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>

          {activeCategory && (
            <form
              className={styles.searchWrapper}
              onSubmit={handleSearchSubmit}
            >
              <img
                src="./img/icons/search.svg"
                alt="Search"
                className={styles.searchIcon}
              />
              <input
                type="text"
                className={styles.searchInput}
                placeholder={`Search... `}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form>
          )}

          <div className={styles.actions}>
            <div className={styles.desktopActions}>
              <NavLink
                to="/favourites"
                className={({ isActive }) =>
                  classNames(styles.actionsBtn, {
                    [styles['actionsBtn--active']]: isActive,
                  })
                }
              >
                <div className={styles.iconWrapper}>
                  <div className={styles.iconHeart} />

                  {favouritesCount > 0 && (
                    <span className={styles.badge}>{favouritesCount}</span>
                  )}
                </div>
              </NavLink>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  classNames(styles.actionsBtn, {
                    [styles['actionsBtn--active']]: isActive,
                  })
                }
              >
                <div className={styles.iconWrapper}>
                  <div className={styles.iconBag} />

                  {totalCount > 0 && (
                    <span className={styles.badge}>{totalCount}</span>
                  )}
                </div>
              </NavLink>
            </div>

            <button
              type="button"
              className={classNames(styles.burgerBtn, {
                [styles.isOpen]: isMenuOpen,
              })}
              onClick={() => setIsMenuOpen(true)}
              aria-label="Toggle menu"
            >
              <span className={styles.burgerIcon} />
            </button>
          </div>
        </div>
      </header>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
