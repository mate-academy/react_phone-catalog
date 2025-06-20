import { useLocation } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  const { pathname } = useLocation();

  if (pathname === '/profile') {
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer__logo"></div>

      <nav className="footer__nav">
        <ul>
          <li>
            <a
              target="__blanck"
              className="footer__nav-item"
              href="https://github.com/"
            >
              GITHUB
            </a>
          </li>

          <li>
            <a className="footer__nav-item" href="#">
              CONTACTS
            </a>
          </li>

          <li>
            <a className="footer__nav-item" href="#">
              RIGHTS
            </a>
          </li>
        </ul>
      </nav>

      <div className="footer__back-to-top">
        <p className="footer__back-to-top-p">Back to top</p>

        <a className="footer__back-to-top-button" href="#topBar"></a>
      </div>
    </footer>
  );
};
