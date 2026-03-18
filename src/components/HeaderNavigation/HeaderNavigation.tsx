import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import { HeaderNavBar } from '../HeaderNavBar/HeaderNavBar';
import { IconNavLink } from '../IconNavLink';
import { LangSelector } from '../LangSelector';
import { MobileMenuButton } from '../Buttons/MobileMenuButton';
import { HeaderSearch } from '../HeaderSearch';
import { useTranslate } from '../../hooks/useTranslate';
import { useFavorite } from '../../hooks/useFavorite';
import { useCart } from '../../hooks/useCart';
import { useTheme } from '../../hooks/useTheme';
import { ToggleThemeButton } from '../Buttons/ToggleThemeButton';
import { createNavLinkClass } from '../../utils/getActiveClass';
import { HEADER_NAV_ITEMS } from '../../constants/nav';
import { LANG_OPTIONS } from '../../constants/Products/sortingBy';
import style from './HeaderNavigation.module.scss';

type Props = {
  onOpenMobileMenu: () => void;
};

export const HeaderNavigation: React.FC<Props> = ({ onOpenMobileMenu }) => {
  const { totalFavoriteProducts } = useFavorite();
  const { totalCartItems } = useCart();
  const t = useTranslate();

  const { theme, toggleTheme } = useTheme();

  const isPhonesPage = useMatch(ROUTES.phones);
  const isTabletsPage = useMatch(ROUTES.tablets);
  const isAccessoriesPage = useMatch(ROUTES.accessories);

  const isProductPage = isPhonesPage || isTabletsPage || isAccessoriesPage;

  const headerNavLinksClass = createNavLinkClass(style, 'navLink');
  const navButtonClass = createNavLinkClass(style, 'navButton');

  return (
    <HeaderNavBar>
      <ul className={style.navList}>
        {HEADER_NAV_ITEMS.map(item => (
          <li key={item.to} className={style.navItem}>
            <NavLink className={headerNavLinksClass} to={item.to}>
              {t(item.label)}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={style.navButtons}>
        <div className={style.navButton}>
          <LangSelector options={LANG_OPTIONS} />
        </div>

        {isProductPage && (
          <div className={style.navButton}>
            <HeaderSearch />
          </div>
        )}

        <div className={style.navButtonsTablet}>
          <div className={style.navButton}>
            <ToggleThemeButton currentTheme={theme} handleClick={toggleTheme} />
          </div>

          <IconNavLink
            to={ROUTES.favorites}
            iconName="favorite"
            className={navButtonClass}
            ariaLabel={'Favorite'}
            qty={totalFavoriteProducts}
          />

          <IconNavLink
            to={ROUTES.cart}
            iconName="cart"
            className={navButtonClass}
            ariaLabel={'Cart'}
            qty={totalCartItems}
          />
        </div>

        <div className={style.navButtonMobile}>
          <MobileMenuButton
            iconName="burgerMenu"
            handleClick={onOpenMobileMenu}
            ariaLabel="Open menu"
          />
        </div>
      </div>
    </HeaderNavBar>
  );
};
