import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Logo from '../../../assets/img/Logo.png';
import { Icon } from '../../shared/ui/Icon';
import { CartLink } from './components/CartLink';
import { FavouritesLink } from './components/FavouritesLink';
import { MenuList } from './components/MenuList';
import { useHeader } from './hooks/useHeader';
import { MenuItem } from './types';
import classes from './header.module.scss';

type Props = {
  menuItems: MenuItem[];
};

export const Header: FC<Props> = ({ menuItems }) => {
  const [isMenuOpen, toggleIsMenuOpen] = useHeader();

  return (
    <header className={classes.header}>
      <Link to={'/'} className={classes.header__logo}>
        <img className={classes.header__logoImg} src={Logo} alt="LOGO" />
      </Link>
      <nav
        className={cn(classes.header__nav, {
          [classes.header__nav_open]: isMenuOpen,
        })}
      >
        <MenuList items={menuItems} />

        <div className={classes.header__iconLinks}>
          <FavouritesLink
            to={'/dsa'}
            className={({ isActive }) =>
              cn(classes.header__iconLink, {
                [classes.header__iconLink_active]: isActive,
              })
            }
          />
          <CartLink
            to={'/asd'}
            className={({ isActive }) =>
              cn(classes.header__iconLink, {
                [classes.header__iconLink_active]: isActive,
              })
            }
          />
        </div>
      </nav>
      <button
        title="menu"
        className={classes.header__burgerMenu}
        onClick={toggleIsMenuOpen.bind(null, undefined)}
      >
        <Icon variant={isMenuOpen ? 'cross' : 'menu'} />
      </button>
    </header>
  );
};
