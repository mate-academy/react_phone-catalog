import { Link } from 'react-router-dom';
import './header.scss';
import { HeaderNavigation } from './HeaderNavigation';
import { BurgerNavigator } from './BurgerNavigator';
import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ThemeSwitcher } from '../Theme/ThemeSwitcher';

export const Header = () => {
  const [isBurgerMenu, setIsburgerMenu] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <div className="header">
        <div className="header__container">
          <div className="header__logo">
            <Link
              to="/"
              className="header__link"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsburgerMenu(false);
              }}
            >
              <img
                className="logo top-logo"
                src={
                  theme === 'light'
                    ? './img/icons/Logo.svg'
                    : './img/icons/Logo_dark.svg'
                }
                alt="Logo Nice Gadgets"
              />
            </Link>
          </div>

          <HeaderNavigation />

          <div className="theme">
            <div
              className="burger__menu"
              onClick={() => {
                setIsburgerMenu(prev => !prev);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                className="icon"
                src={
                  isBurgerMenu
                    ? theme === 'light'
                      ? './img/icons/Menu-close_icon.svg'
                      : './img/icons/Close_dark.svg'
                    : theme === 'light'
                      ? './img/icons/Burger-menu_icon.svg'
                      : './img/icons/Burger-menu_dark.svg'
                }
                alt="Menu icon"
              />
            </div>

            <ThemeSwitcher />
          </div>
        </div>
      </div>
      <BurgerNavigator
        isBurgerMenu={isBurgerMenu}
        onClose={() => setIsburgerMenu(false)}
      />
    </>
  );
};
