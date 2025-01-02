import React, { useContext } from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import { iconsObject } from '../../../constants/iconsObject';
import { GlobalContext } from '../../../store/GlobalContext';

export const Footer: React.FC = () => {
  const { theme } = useContext(GlobalContext);

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="footer">
      <div className="footer__container">
        <a href="#" className="footer__logo-container">
          {theme === 'light' ? (
            <img src="logo.svg" alt="Nice Gadgets" className="header__logo" />
          ) : (
            <img
              src="logo_dark.svg"
              alt="Nice Gadgets"
              className="header__logo"
            />
          )}
        </a>

        <div className="footer__items">
          <Link
            to="https://github.com/hsvirina"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Link>
          <Link
            to="https://www.linkedin.com/in/hanna-svirina-dev/"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contacts
          </Link>
          <Link to="/" className="footer__link">
            rights
          </Link>
        </div>

        <div className="footer__block" onClick={backToTop}>
          <span className="footer__button-title">Back to top</span>
          <button className="footer__button">
            {theme === 'light' ? (
              <Icon icon={iconsObject.arrow_left} />
            ) : (
              <Icon icon={iconsObject.arrow_left_dark} />
            )}

          </button>
        </div>
      </div>
    </div>
  );
};
