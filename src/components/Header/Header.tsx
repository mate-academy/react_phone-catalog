import { NavLink } from 'react-router-dom';
import s from './Header.module.scss';
import logo from '../../assets/images/Logo.svg';
import favorites from '../../assets/images/icons/Favourites (Heart Like).svg';
import menuIcon from '../../assets/images/icons/Union.svg';
import closeIcon from '../../assets/images/icons/Close.svg';
import cart from '../../assets/images/icons/Shopping bag (Cart).svg';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useCart, useFavorites } from '../../hooks/ContextHook';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/phones', label: 'Phones' },
  { path: '/tablets', label: 'Tablets' },
  { path: '/accessories', label: 'Accessories' },
];

const navIconItems = [
  { path: '/favorites', name: 'Favorites', icon: favorites, alt: 'favorites' },
  { path: '/cart', name: 'Cart', icon: cart, alt: 'cart' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // перемикаємо стан isMenuOpen
  };

  const makeNavLinkClass =
    (base: string) =>
    ({ isActive }: { isActive: boolean }) =>
      classNames(base, { [s.isActive]: isActive });

  const navClass = makeNavLinkClass(s.link);
  const menuClass = makeNavLinkClass(s.linkMenu);
  const iconClass = makeNavLinkClass(s.iconLink);

  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <NavLink to="/" className={s.logoWrapper}>
          <img src={logo} alt="Logo" className={s.img} />
        </NavLink>

        <div className={s.productContainer}>
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <button className={s.menuButton} onClick={toggleMenu}>
          <img src={isMenuOpen ? closeIcon : menuIcon} alt="menuIcon" aria-hidden="true" />
        </button>

        {isMenuOpen && (
          <aside className={s.mobileMenu}>
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={menuClass} onClick={toggleMenu}>
                <span>{item.label}</span>
              </NavLink>
            ))}

            <div className={s.footerMenu}>
              {navIconItems.map((item) => (
                <NavLink key={item.path} to={item.path} className={iconClass} onClick={toggleMenu}>
                  <div className={s.iconWrapper}>
                    <img src={item.icon} alt={item.alt} />

                    {item.name === 'Cart' && totalItems > 0 && (
                      <span className={s.badge}>{totalItems}</span>
                    )}

                    {item.name === 'Favorites' && totalFavorites > 0 && (
                      <span className={s.badge}>{totalFavorites}</span>
                    )}
                  </div>
                </NavLink>
              ))}
            </div>
          </aside>
        )}

        <div className={s.selectedContainer}>
          {navIconItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={iconClass}>
              <div className={s.iconWrapper}>
                <img src={item.icon} alt={item.alt} />

                {item.name === 'Cart' && totalItems > 0 && (
                  <span className={s.badge}>{totalItems}</span>
                )}

                {item.name === 'Favorites' && totalFavorites > 0 && (
                  <span className={s.badge}>{totalFavorites}</span>
                )}
              </div>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};
