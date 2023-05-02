import { Link } from 'react-router-dom';
import { Nav, NavLink } from '../Nav';
import './Footer.scss';

import { ReactComponent as Logo } from '../../images/logo.svg';
import { ReactComponent as ArrowTop } from '../../images/icons/arrow-top.svg';

const navLinks: NavLink[] = [
  {
    path: 'phones',
    display: 'Github',
  },
  {
    path: 'tablets',
    display: 'Contacts',
  },
  {
    path: 'accessories',
    display: 'Rights',
  },
];

export const Footer: React.FC = () => {
  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <footer className="footer">
      <Link to="/" className="logo footer__logo">
        <Logo />
      </Link>

      <Nav navLinks={navLinks} />

      <div className="footer__back-to-top">
        <div className="footer__back-to-top-text">
          Back to top
        </div>

        <button
          className="footer__back-to-top-button"
          onClick={scrollTop}
          type="button"
        >
          <ArrowTop />
        </button>
      </div>

    </footer>
  );
};
