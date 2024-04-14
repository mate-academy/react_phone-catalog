import './Footer.scss';
import { Link, useLocation } from 'react-router-dom';
import { ICONS } from '../../images/icons/Icons';

export const Footer = () => {
  const { pathname } = useLocation();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  if (pathname === '/menu') {
    return null;
  }

  return (
    <footer className="footer">
      <Link to="/" className="footer--logo--link">
        <img src={ICONS.logo} alt="Logo" className="footer--logo" />
      </Link>

      <nav className="footer__navigation">
        <ul className="footer__navigation--list">
          <li className="footer__navigation--item">
            <Link
              to="https://github.com/edkido"
              target="_blank"
              className="upperCase footer__navigation--link"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </li>
          <li className="footer__navigation--item">
            <Link
              to="https://www.linkedin.com/in/eduard-herasym-185240249/"
              target="_blank"
              className="upperCase footer__navigation--link"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
          </li>
          <li className="footer__navigation--item">
            <Link
              to="https://github.com/edkido"
              target="_blank"
              className="upperCase footer__navigation--link"
              rel="noopener noreferrer"
            >
              Rights
            </Link>
          </li>
        </ul>
      </nav>

      <Link
        to={pathname}
        className="footer__back-to-top"
        onClick={handleScrollToTop}
      >
        <p className="footer__back-to-top--text">Back to top</p>
        <img
          src={ICONS.arrowUp}
          className="footer__back-to-top--icon"
          alt="Back to top"
        />
      </Link>
    </footer>
  );
};
