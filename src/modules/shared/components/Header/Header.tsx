import { useState } from 'react';
import style from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { Menu } from '../../../../components/Menu/Menu';
import { LINKS } from '../../../../constants/categories/categories';
import { useCartState } from '../../../../store/CartProvider';
import { useFavoritesState } from '../../../../store/FavouritesProvider';
import { scrollToTop } from '../../../../utils/helpers/helpers';
import { useTheme } from '../../../../store/ThemeContext';
import { ICONS } from '../../../../assets/icons';

export const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { items } = useCartState();
  const { favItems } = useFavoritesState();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={style.header}>
      <div className={style.header__container}>
        <a href="#" className={style.header__logoWrapper}>
          <img
            src={theme === 'dark' ? ICONS.logoDark : ICONS.logoLight}
            alt="logo"
            className={style.header__logoWrapper__logo}
          />
        </a>
        <nav className={style.nav}>
          <ul className={style.nav__list}>
            {LINKS.map(link => (
              <li className={style.nav__item} key={link}>
                <NavLink
                  onClick={scrollToTop}
                  to={link === 'home' ? '/' : link}
                  className={({ isActive }) =>
                    isActive
                      ? `${style.nav__link} ${style.isActive}`
                      : style.nav__link
                  }
                >
                  {link}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className={style.nav__icons}>
            <span className={style.nav__icons__theme} onClick={toggleTheme}>
              <img
                src={theme === 'dark' ? ICONS.moon : ICONS.sun}
                alt="theme"
              />
            </span>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `${style.nav__icons__icon} ${isActive ? style.nav__icons__iconActive : ''}`
              }
              onClick={scrollToTop}
            >
              <img
                src={theme === 'dark' ? ICONS.darkFav : ICONS.fav}
                alt="favourites"
              />
              {favItems.length > 0 && (
                <span className={style.nav__icons__badge}>
                  {favItems.length}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${style.nav__icons__icon} ${isActive ? style.nav__icons__iconActive : ''}`
              }
              onClick={scrollToTop}
            >
              <img
                src={theme === 'dark' ? ICONS.darkBag : ICONS.bag}
                alt="shoppingBag"
              />
              {items.length > 0 && (
                <span className={style.nav__icons__badge}>{items.length}</span>
              )}
            </NavLink>
          </div>
        </nav>
        <div className={style.mobileActions}>
          <span className={style.menu} onClick={toggleTheme}>
            <img src={theme === 'dark' ? ICONS.moon : ICONS.sun} alt="theme" />
          </span>

          <div
            className={style.menu}
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          >
            <img
              src={
                menuIsOpen
                  ? theme === 'dark'
                    ? ICONS.darkClose
                    : ICONS.close
                  : theme === 'dark'
                    ? ICONS.darkMenu
                    : ICONS.menu
              }
              alt="menu"
            />
          </div>
        </div>
      </div>
      <Menu isOpen={menuIsOpen} onClose={setMenuIsOpen} />
    </header>
  );
};
