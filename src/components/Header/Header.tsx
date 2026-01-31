import { Link } from 'react-router-dom';
import './header.scss';
import { HeaderNavigation } from './HeaderNavigation';
import { BurgerNavigation } from './BurgerNavigation';
import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ThemeSwitcher } from '../Theme/ThemeSwitcher';

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
                    ? import.meta.env.BASE_URL + 'img/icons/Logo.svg'
                    : import.meta.env.BASE_URL + 'img/icons/Logo.svg' // PLS!!! Add dark icon
                }
                alt="Logo"
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
                className="icon"
                src={
                  isBurgerMenu
                    ? theme === 'light'
                      ? import.meta.env.BASE_URL + 'img/icons/Close_icon.svg'
                      : import.meta.env.BASE_URL + 'img/icons/Close_icon.svg' // PLS!!! Add dark icon
                    : theme === 'light'
                      ? import.meta.env.BASE_URL + 'img/icons/Menu_icon.svg'
                      : import.meta.env.BASE_URL + 'img/icons/Menu_icon.svg' // PLS!!! Add dark icon
                }
                alt="Menu icon"
              />
            </div>

            <ThemeSwitcher />
          </div>
        </div>
      </div>
      <BurgerNavigation
        isBurgerMenu={isBurgerMenu}
        onClose={() => setIsBurgerMenu(false)}
      />
    </>
  );
};
