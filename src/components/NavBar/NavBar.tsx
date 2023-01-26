import cn from 'classnames';
import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Styles } from '../../types/Styles';
import { Logo } from '../Logo';
import { NavBarLink } from '../../types/NavBarLink';

const styles: Styles = require('./NavBar.module.scss');

const {
  NavBar: nav,
  'NavBar--dark': navDark,
  NavBar__top: top,
  'NavBar__top--dark': topDark,
  NavBar__logo: logo,
  NavBar__list: navList,
  NavBar__item: navItem,
  NavBar__link: navLink,
  'NavBar__link--dark': navLinkDark,
  'NavBar__link--active': navLinkActive,
  'NavBar__link--active-dark': navLinkActiveDark,
  NavBar__actions: actions,
  'NavBar__actions--dark': actionsDark,
  'NavBar__actions-link': actionsLink,
  'NavBar__actions-link--dark': actionsLinkDark,
  'NavBar__actions-link--close': actionsLinkClose,
  'NavBar__actions-link--active': actionsLinkActive,
  'NavBar__actions-link--active-dark': actionsLinkActiveDark,
  'NavBar__items-counter': itemsCounter,
  'NavBar__items-counter--dark': itemsCounterDark,
  'NavBar__items-count': itemsCount,
} = styles;

type Props = {
  className?: string;
  onMenuToggle: () => void;
  onNavLinkClick: () => void;
};

export const NavBar: FC<Props> = ({
  className = '',
  onMenuToggle,
  onNavLinkClick,
}) => {
  const { isThemeDark, theme } = useContext(ThemeContext);
  const { favorites } = useContext(FavoritesContext);
  const { totalItems } = useContext(CartContext);

  return (
    <nav
      className={cn(
        nav,
        { [navDark]: isThemeDark },
        className,
      )}
    >
      <div
        className={cn(
          top,
          { [topDark]: isThemeDark },
        )}
      >
        <Logo
          className={logo}
          onclick={onNavLinkClick}
        />

        <button
          onClick={onMenuToggle}
          type="button"
          className={cn(
            actionsLink,
            [actionsLinkClose],
            { [actionsLinkDark]: isThemeDark },
          )}
        >
          <img
            src={`./icons/Close_${theme}.svg`}
            alt="close"
          />
        </button>
      </div>

      <ul className={navList}>
        {Object.entries(NavBarLink).map(([key, value]) => (
          <li
            className={navItem}
            key={key}
          >
            <NavLink
              onClick={onNavLinkClick}
              to={value}
              className={({ isActive }) => cn(
                navLink,
                { [navLinkActive]: isActive },
                { [navLinkDark]: isThemeDark },
                { [navLinkActiveDark]: isThemeDark && isActive },
              )}
            >
              {key}
            </NavLink>
          </li>
        ))}
      </ul>

      <div
        className={cn(
          actions,
          { [actionsDark]: isThemeDark },
        )}
      >
        <NavLink
          onClick={onNavLinkClick}
          to="/favorites"
          className={
            ({ isActive }) => cn(
              actionsLink,
              { [actionsLinkActive]: isActive },
              { [actionsLinkDark]: isThemeDark },
              { [actionsLinkActiveDark]: isThemeDark && isActive },
            )
          }
        >
          <img
            src={`./icons/Heart_${theme}.svg`}
            alt="favorites"
          />

          {!!favorites.length && (
            <div
              className={cn(
                itemsCounter,
                { [itemsCounterDark]: isThemeDark },
              )}
            >
              <span className={itemsCount}>
                {favorites.length}
              </span>
            </div>
          )}
        </NavLink>

        <NavLink
          onClick={onNavLinkClick}
          to="/cart"
          className={({ isActive }) => cn(
            [actionsLink],
            { [actionsLinkActive]: isActive },
            { [actionsLinkDark]: isThemeDark },
            { [actionsLinkActiveDark]: isThemeDark && isActive },
          )}
        >
          <img
            src={`./icons/Cart_${theme}.svg`}
            alt="cart"
          />

          {!!totalItems && (
            <div
              className={cn(
                itemsCounter,
                { [itemsCounterDark]: isThemeDark },
              )}
            >
              <span className={itemsCount}>
                {totalItems}
              </span>
            </div>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

NavBar.defaultProps = {
  className: '',
};
