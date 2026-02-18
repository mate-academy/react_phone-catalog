import './header.scss';
import { useTheme } from '../context/ThemeContext';
import { ThemeSwitcher } from '../Theme/ThemeSwitcher';
import { HeaderNavigation } from './HeaderNavigation';
import { HeaderBurgerMenu } from './HeaderBurgerMenu';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);
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
                setIsBurgerMenu(false);
              }}
            >
              <img
                className="logo top-logo"
                src={
                  theme === 'light'
                    ? './img/icons/Logo-for-light.svg'
                    : './img/icons/Logo-for-black.svg'
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
                setIsBurgerMenu(prev => !prev);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                className="burger"
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
      <HeaderBurgerMenu
        isBurgerMenu={isBurgerMenu}
        onClose={() => setIsBurgerMenu(false)}
      />
    </>
  );
};
