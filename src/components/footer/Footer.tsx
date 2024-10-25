import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';
import './Footer.scss';
import { ArrowButton } from '../arrowButton/ArrowButton';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="footer">
      <hr className="footer__line" />
      <img src={Logo} alt="logo" className="footer__logo" />
      <div className="footer__links">
        <Link to="" className="footer__linkText">
          Github
        </Link>
        <Link to="" className="footer__linkText">
          Contacts
        </Link>
        <Link to="" className="footer__linkText">
          Rights
        </Link>
      </div>
      <div className="footer__toTop">
        <p className="footer__text">Back to top</p>
        <ArrowButton
          diraction="top"
          click={() => scrollToTop()}
          disable={false}
        />
      </div>
    </div>
  );
};
