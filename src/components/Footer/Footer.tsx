import { Link } from 'react-router-dom';
import './Footer.scss';
import { FooterNavigation } from '../FooterNavigation';
import { IconButton } from '../../bits/IconButton/IconButton';

export const Footer = () => {
  return (
    <footer className="footer">
      <Link
        className="footer__logo"
        to="/"
      >
        <img alt="logo" src="./img/icons/logo.svg" />
      </Link>

      <FooterNavigation />

      <div className="footer__button-box">
        <span className="footer__button-title">back to top</span>
        <IconButton iconClass="footer__button-icon" />
      </div>
    </footer>
  );
};
