import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';

import { useTranslation } from 'react-i18next';
import { HeartIcon } from '../../../../../assets/icons/heart-icon';
import { Icon } from '../../../atoms/Icon';
import { MenuIcon } from '../../../../../assets/icons/menu-icon';
import { ShoppingBagIcon } from '../../../../../assets/icons/shopping-bag-icon';
import { SideMenu } from '../SideMenu';
import { NAV_LINKS } from '../../../../../constants/navigation';
import { HTMLDataAttr } from '../../../../../enums/htmlDataAttribs';
import { selectTotalItems } from '../../../../../features/cartSlice';
import { setElementDataAttr } from '../../../../../helpers/setHtmlDataAttr';
import { useAppSelector } from '../../../../../hooks/hooks';
import { NavLink as TextNavLink } from '../../../atoms/NavLink';
import { IconButton } from '../../../atoms/IconButton';
import { BadgeCounter } from '../../../atoms/BadgeCounter';
import { LanguageSwitcher } from '../../../molecules/LanguageSwitcher';
import { ThemeToggleButton } from './components/ThemeToggleButton';
import { LogoLink } from '../../../molecules/LogoLink';
import { SettingsMenu } from './components/molecules/SettingsMenu';

type Props = {
  className?: string;
};

export const Header: React.FC<Props> = ({ className = '' }) => {
  const { t } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { favourites } = useAppSelector(state => state.favourites);
  const { cartItems } = useAppSelector(state => state.cart);
  const totalItems = useAppSelector(selectTotalItems);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    setElementDataAttr('body', HTMLDataAttr.Menu, isMenuOpen);
  }, [isMenuOpen]);

  return (
    <header className={classNames(styles.header, className)}>
      <div className={styles.header__content}>
        <LogoLink className={styles.header__logo} />
        <nav className={styles.nav}>
          <ul className={styles.list}>
            {NAV_LINKS.map(({ label, path }) => (
              <li key={label} className={styles.item}>
                <TextNavLink to={path}>{t(`navlink.${label}`)}</TextNavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.header__icons}>
          <SettingsMenu className={styles.header__settings}>
            <LanguageSwitcher className={styles.header__language} />
            <ThemeToggleButton />
          </SettingsMenu>

          <TextNavLink
            to="/favourites"
            className={classNames(
              styles.header__icon,
              styles.link,
              styles.header__hideable,
            )}
          >
            <Icon>
              <HeartIcon />
              {favourites.length > 0 && (
                <BadgeCounter>{favourites.length}</BadgeCounter>
              )}
            </Icon>
          </TextNavLink>
          <TextNavLink
            to="/cart"
            className={classNames(
              styles.header__icon,
              styles.link,
              styles.header__hideable,
            )}
          >
            <Icon>
              <ShoppingBagIcon />
              {cartItems.length > 0 && (
                <BadgeCounter>{totalItems}</BadgeCounter>
              )}
            </Icon>
          </TextNavLink>

          <IconButton
            className={classNames(styles.header__icon, styles.header__menu)}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            fullHeight
          >
            <Icon>
              <MenuIcon />
            </Icon>
          </IconButton>
        </div>

        <SideMenu isOpen={isMenuOpen} onClose={closeMenu} />
      </div>
    </header>
  );
};
