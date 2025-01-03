import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import Logo from '../../images/homePage/Logo.svg';
import Logo_dark from '../../images/homePage/Logo_dark.svg';
import Logo_blue from '../../images/homePage/Logo_blue.svg';
import Vector_Up from '../../images/homePage/Vector_Up.svg';
import Vector_Up_dark from '../../images/homePage/Vector_Up_dark.svg';
import { ThemeVars } from '../../types/themeTypes';
import './Footer.scss';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const theme = useAppSelector(state => state.themeSwitcher.theme);

  const selectedLogo = () => {
    switch(theme) {
      case ThemeVars.DARK:
        return Logo_dark;
      
      case ThemeVars.ORIGIN:
        return Logo;

      case ThemeVars.BLUE:
        return Logo_blue;

      default:
        return Logo;
    }
  };
  const footerClass = `footer theme-${theme}`;
  const rootClass = `footer__link theme-${theme}`;
  const footerButton = `footer__back__button theme-${theme}`;
  const footerBack = `footer__back__img theme-${theme}`;
  const selectedArr = theme === ThemeVars.DARK 
    ? Vector_Up_dark 
    : Vector_Up;

  return (
    <footer className={footerClass}>
      <div className="footer__top-head">
        <NavLink to="/">
          <img className="footer__logo" src={selectedLogo()} alt="logo" />
        </NavLink>
      </div>
      <div className="footer__links">
        <NavLink
          to="https://github.com/mate-academy/react_phone-catalog/pull/387"
          className={rootClass}
        >
          GITHUB
        </NavLink>
        <NavLink to="/" className={rootClass}>
          CONTACTS
        </NavLink>
        <NavLink to="/" className={rootClass}>
          RIGHTS
        </NavLink>
      </div>
      <div className="footer__back">
        <button className={footerButton} onClick={handleScrollToTop}>
          Back to top
          <img src={selectedArr} className={footerBack} />
        </button>
      </div>
    </footer>
  );
};
