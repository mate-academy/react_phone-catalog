import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { HeaderNavBar } from '../HeaderNavBar/HeaderNavBar';
import { IconNavLink } from '../IconNavLink';
import { MobileMenuButton } from '../Buttons/MobileMenuButton/MobileMenuButton';
import { ToggleThemeButton } from '../Buttons/ToggleThemeButton';
import { useFavorite } from '../../hooks/useFavorite';
import { useCart } from '../../hooks/useCart';
import { useTheme } from '../../hooks/useTheme';
import { useTranslate } from '../../hooks/useTranslate';
import { ROUTES } from '../../router/routes';
import { createNavLinkClass } from '../../utils/getActiveClass';
import { HEADER_NAV_ITEMS } from '../../constants/nav';
import '../../App.scss';
import style from './Menu.module.scss';
import cn from 'classnames';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Menu: React.FC<Props> = ({ isOpen, onClose }) => {
  const { totalFavoriteProducts } = useFavorite();
  const { totalCartItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const t = useTranslate();

  const menuLinksClass = createNavLinkClass(style, 'menuLink');
  const footerLinkClass = createNavLinkClass(style, 'menuFooterLink');

  useEffect(() => {
    const bodyClass = 'no-scroll';

    if (isOpen) {
      document.body.classList.add(bodyClass);
    }

    return () => {
      document.body.classList.remove(bodyClass);
    };
  }, [isOpen]);

  return (
    <aside
      className={cn(style.menu, {
        [style.menuOpen]: isOpen,
      })}
      aria-label="Mobile menu"
    >
      <HeaderNavBar>
        <div className={style.menuButtonsContent}>
          <div className={style.menuHeaderButton}>
            <ToggleThemeButton currentTheme={theme} handleClick={toggleTheme} />
          </div>

          <MobileMenuButton
            iconName="close"
            handleClick={onClose}
            ariaLabel="Close menu"
          />
        </div>
      </HeaderNavBar>

      <ul className={style.menuList}>
        {HEADER_NAV_ITEMS.map(item => (
          <li key={item.to} className={style.menuItem} onClick={onClose}>
            <NavLink className={menuLinksClass} to={item.to}>
              {t(item.label)}
            </NavLink>
          </li>
        ))}
      </ul>

      <nav className={style.menuFooter}>
        <IconNavLink
          to={ROUTES.favorites}
          iconName="favorite"
          className={footerLinkClass}
          ariaLabel={'Favorite'}
          qty={totalFavoriteProducts}
          onClick={onClose}
        />

        <IconNavLink
          to={ROUTES.cart}
          iconName="cart"
          className={footerLinkClass}
          ariaLabel={'Cart'}
          qty={totalCartItems}
          onClick={onClose}
        />
      </nav>
    </aside>
  );
};
