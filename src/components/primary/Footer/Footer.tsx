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
            <a
              target="__blanck"
              className="footer__nav-item"
              href="https://goo.gl/maps/1xUeZtXrT9oYcW1N6"
            >
              CONTACTS
            </a>
          </li>

          <li>
            <a
              target="__blanck"
              className="footer__nav-item"
              href="https://www.google.com/maps?q=49.8419,24.0315"
            >
              RIGHTS
            </a>
          </li>
        </ul>
      </nav>

      <div className="footer__back-to-top">
        <p className="footer__back-to-top-p">Back to top</p>

        <a
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
          className="footer__back-to-top-button"
        ></a>
      </div>
    </footer>
  );
};
