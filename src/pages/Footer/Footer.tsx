import { NavLink } from 'react-router-dom';
import Logo from '../../images/homePage/Logo.svg';
import Vector_Up from '../../images/homePage/Vector_Up.svg';
import './Footer.scss';

export const Footer = () => {
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth'})
  }

  return (
    <footer className="footer">
      <div className="footer__top-head">
        <NavLink to="/">
          <img className="footer__logo" src={Logo} alt="logo" />
        </NavLink>
      </div>
      <div className="footer__links">
        <NavLink to="https://Hanna-Balabukha.github.io/react_phone-catalog/" className="footer__link">
          GITHUB
        </NavLink>
        <NavLink to="/" className="footer__link">
          CONTACTS
        </NavLink>
        <NavLink to="/" className="footer__link">
          RIGHTS
        </NavLink>
      </div>
      <div className="footer__back">
        <button 
          className="footer__back__button"
          onClick={handleScrollToTop}
          >
          Back to top
          <img src={Vector_Up} className="footer__back__img" />
        </button>
      </div>
    </footer>
  );
};
