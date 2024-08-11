/* eslint-disable max-len */
import React, { ComponentPropsWithoutRef, FC, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { useIsThemeDark } from '../../../../app/features/preferences/useIsThemeDark';
import { getLogoPath } from '../../../../utils/getLogoPath';
import { Icon } from '../../../shared/ui/Icon';
import { MenuItem } from '../../types';
import { useHeaderSlot } from '../../HeaderSlotContext';
import { HeaderMenuList } from '../HeaderMenuList';
import { CartLink } from './CartLink';
import { useHeader } from './useHeader';
import { FavouritesLink } from './FavouritesLink';
import classes from './header.module.scss';

type Props = ComponentPropsWithoutRef<'header'> & {
  links: MenuItem[];
};

export const Header: FC<Props> = ({ className, links, ...props }) => {
  const { setSlotRef } = useHeaderSlot();
  const [isMenuOpen, toggleIsMenuOpen] = useHeader();
  const [isDark, toggleIsDark] = useIsThemeDark();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSlotRef(containerRef);
  }, [setSlotRef]);

  return (
    <header {...props} className={cn(classes.header, className)}>
      <Link to={'/'} className={classes.header__logo}>
        <img
          className={classes.header__logoImg}
          src={getLogoPath(isDark)}
          alt="LOGO"
        />
      </Link>

      <nav
        onClick={() => toggleIsMenuOpen(false)}
        className={cn(classes.header__nav, {
          [classes.header__nav_open]: isMenuOpen,
        })}
      >
        <HeaderMenuList items={links} />

        <div className={cn(classes.header__slot)} ref={containerRef} />

        <div className={classes.header__iconLinks}>
          <FavouritesLink />
          <CartLink />
        </div>
      </nav>
      <button
        title={`Switch to ${isDark ? 'light' : 'dark'}`}
        className={classes.header__theme}
        onClick={toggleIsDark}
      >
        <Icon variant={isDark ? 'darkMode' : 'lightMode'} />
      </button>
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
