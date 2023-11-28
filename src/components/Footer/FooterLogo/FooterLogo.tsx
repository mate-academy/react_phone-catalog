import { Link } from 'react-router-dom';

export const FooterLogo = () => (
  <Link to="/" className="footer__logos">
    <img
      className="footer__logo"
      src="./img/logo.svg"
      alt="footer-logo"
      loading="lazy"
    />
  </Link>
);
