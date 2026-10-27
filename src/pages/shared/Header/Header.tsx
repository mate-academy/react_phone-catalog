import './Header.scss';
import classNames from 'classnames';
import { useContext, useMemo, FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GlobalContext } from '../../../context/GlobalContext';
import { icons } from '../../../constants/iconsObject';
import { Icon } from '../Icon';
import { navLinks } from '../../../constants/navLinks';

const getActiveItem = ({ isActive }: { isActive: boolean }) =>
  classNames('header__item', { 'header__item--active': isActive });

const getActiveIcon = ({ isActive }: { isActive: boolean }) =>
  classNames('header__icon', { 'header__icon--active': isActive });

export const Header: FC = () => {
  const { cart, favorites, toggleMenu, isMenuOpen, theme, toggleTheme } =
    useContext(GlobalContext);

  const totalQuantity = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  return (
    <div className="header">
      <Link to="/" className="header__logo-container">
        <img
          src={theme === 'light' ? 'logo.svg' : 'logo_dark.svg'}
          alt="Nice Gadgets"
          className="header__logo"
        />
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
