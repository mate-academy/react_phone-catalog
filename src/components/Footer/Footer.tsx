import { Link } from 'react-router-dom';

import './Footer.scss';

export const footerLinks = [
  {
    name: 'Github',
    path: 'https://github.com/Horizon-git',
  },
  {
    name: 'Contacts',
    path: '/',
  },
  {
    name: 'Rights',
    path: '/',
  },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <Link to="/">
          <img
            src="./img/icons/logo.svg"
            alt="Logo"
            className="logo logo--footer"
          />
        </Link>

        <nav className="footer__nav">
          {footerLinks.map(({ name, path }) => (
            <Link to={path} className="footer__link" key={name}>
              {name}
            </Link>
          ))}
        </nav>

        <button
          className="footer__button"
          type="button"
          onClick={() => scrollToTop()}
        >
          <img src="./img/icons/arrow.svg" alt="Arrow" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
