import classNames from 'classnames';
import s from './NavIcons.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../../../context/app/useAppContext';
import { useCart } from '../../../../context/cart/useCart';
import { useFavorites } from '../../../../context/favorites/useFavorites';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { BASE_URL } from '../../../../utils/variables/base';

type NavIconsProps = {
  variant?: 'topbar' | 'burger';
};

type IconLink = {
  to: string;
  label: string;
  icon: string;
};

export const NavIcons = ({ variant = 'topbar' }: NavIconsProps) => {
  const location = useLocation();
  const { isMenuOpen, openMenu, closeMenu } = useAppContext();

  const icons: IconLink[] = [
    {
      to: '/favourites',
      label: 'Go to favourites page',
      icon: 'icons/favourites.svg',
    },
    {
      to: '/cart',
      label: 'Go to shopping cart',
      icon: 'icons/cart.svg',
    },
  ];

  const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(s.iconLink, s[variant], { [s.isActive]: isActive });

  const { totalCount: cartItemsCount } = useCart();
  const { favorites } = useFavorites();

  return (
    <div className={classNames(s.navIcons, s[variant])}>
      {variant === 'topbar' && <ThemeSwitcher />}
      {icons.map(({ to, label, icon }) => {
        const amount = to === '/favourites' ? favorites.length : cartItemsCount;

        return (
          <div key={to} className={classNames(s.icon, s.navIcon, s[variant])}>
            <NavLink
              to={to}
              className={getIconLinkClass}
              state={{ from: location.pathname }}
              aria-label={label}
            >
              <div className={s.iconWrapper}>
                <img
                  src={`${BASE_URL}${icon}`}
                  alt=""
                  aria-hidden="true"
                  className={s.iconImg}
                />
                {amount > 0 && <span className={s.itemsAmount}>{amount}</span>}
              </div>
            </NavLink>
          </div>
        );
      })}

      {variant === 'topbar' && (
        <div className={classNames(s.icon, s.menuIcon, s[variant])}>
          <button
            type="button"
            className={s.iconLink}
            onClick={isMenuOpen ? closeMenu : openMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <img
              src={
                isMenuOpen
                  ? `${BASE_URL}icons/close.svg`
                  : `${BASE_URL}icons/menu.svg`
              }
              alt=""
              aria-hidden="true"
              className={s.iconImg}
            />
          </button>
        </div>
      )}
    </div>
  );
};
