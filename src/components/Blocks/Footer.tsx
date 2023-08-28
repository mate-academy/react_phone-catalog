import { Link, NavLink } from 'react-router-dom';
import { IconSlideUp } from '../../utils/Icons';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <Link to="/" className="footer__home-link home-link" />
          <nav className="footer__nav nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink
                  className="nav__link"
                  // eslint-disable-next-line max-len
                  to="https://github.com/vetal-hovenko/react_phone-catalog/tree/develop"
                  target="_blank"
                >
                  Github
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  className="nav__link"
                  to="https://github.com/vetal-hovenko"
                  target="_blank"
                >
                  Contacts
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  className="nav__link"
                  // eslint-disable-next-line max-len
                  to="https://github.com/mate-academy/react_phone-catalog/tree/master"
                  target="_blank"
                >
                  Rights
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="footer__back">
            <p className="footer__back--caption">
              Back to top
            </p>
            <button
              type="button"
              className="footer__back--button slider-button"
              onClick={() => scrollToTop()}
            >
              <IconSlideUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
