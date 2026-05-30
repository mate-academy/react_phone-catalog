import React, { useCallback } from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import { icons } from '../../../constants/icons';
import { ButtonIcon } from '../ButtonIcon';

export const Footer: React.FC = () => {
  const backToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <footer className="footer">
      <Link to="/" className="footer__logo-link">
        <img className="footer__logo" src="./img/logo.png" />
      </Link>

      <div className="footer__links">
        <Link to="https://github.com/anna-poplavska" className="footer__link">
          Github
        </Link>

        <Link to="/" className="footer__link">
          Contacts
        </Link>

        <Link to="/" className="footer__link">
          Rights
        </Link>
      </div>

      <div className="footer__button" onClick={backToTop}>
        <span className="footer__button-text">Back to top</span>
        <ButtonIcon icon={icons.arrowUp} />
      </div>
    </footer>
  );
};
