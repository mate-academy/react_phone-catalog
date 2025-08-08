import { NavLink } from 'react-router-dom';
import navBarStyle from './NavBar.module.scss';
import React, { useCallback } from 'react';
import cn from 'classnames';
import { NavVariants } from '../../../../types/NavVariants';
import { PagesType } from '../../../../types/PagesType';

type NavbarProps = {
  variant?: NavVariants;
  onLinkClick?: () => void;
};

const navLinks = [
  { to: PagesType.home, label: 'Home', end: true },
  { to: PagesType.phones, label: 'Phones' },
  { to: PagesType.tablets, label: 'Tablets' },
  { to: PagesType.accessories, label: 'Accessories' },
];

export const Navbar: React.FC<NavbarProps> = React.memo(
  ({ variant = NavVariants.default, onLinkClick }) => {
    const getNavLinkClass = useCallback(
      ({ isActive }: { isActive: boolean }) =>
        cn(navBarStyle.nav__link, {
          [navBarStyle[`nav__link--${variant}`]]: !!variant,
          [navBarStyle[`nav__link--${variant}--active`]]: !!variant && isActive,
          [navBarStyle['nav__link--active']]: !variant && isActive,
        }),
      [variant],
    );

    const liClass = cn(navBarStyle.nav__item, {
      [navBarStyle[`nav__item--${variant}`]]: variant,
    });

    return (
      <nav
        className={cn(navBarStyle.nav, {
          [navBarStyle[`nav--${variant}`]]: variant,
        })}
      >
        <ul
          className={cn(navBarStyle.nav__list, {
            [navBarStyle[`nav__list--${variant}`]]: variant,
          })}
        >
          {navLinks.map(({ to, label, end }) => (
            <li key={to} className={liClass}>
              <NavLink
                to={to}
                end={end}
                className={getNavLinkClass}
                onClick={onLinkClick}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  },
);

Navbar.displayName = 'Navbar';
