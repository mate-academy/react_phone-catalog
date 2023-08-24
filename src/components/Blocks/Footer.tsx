/* eslint-disable max-len */
import { Link, NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <Link to="/" className="footer__home-link home-link" />
          <nav className="footer__nav nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink className="nav__link" to="/">
                  Github
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink className="nav__link" to="/">
                  Contacts
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink className="nav__link" to="/">
                  Rights
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="footer__back">
            <p className="footer__back--caption">
              Back to top
            </p>
            <button type="button" className="footer__back--button slider-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.52858 10.4712C3.26823 10.2109 3.26823 9.78878 3.52858 9.52843L7.52858 5.52843C7.78892 5.26808 8.21103 5.26808 8.47138 5.52843L12.4714 9.52843C12.7317 9.78878 12.7317 10.2109 12.4714 10.4712C12.211 10.7316 11.7889 10.7316 11.5286 10.4712L7.99998 6.94265L4.47138 10.4712C4.21103 10.7316 3.78892 10.7316 3.52858 10.4712Z"
                  fill="#313237"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
