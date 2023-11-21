import {
  Link,
  NavLink,
} from 'react-router-dom';
import './Footer.scss';
import { ICONS } from '../../icons';
import { getLinkClass } from '../../helpers/getLinkClass';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrap">
          <div className="logo">
            <Link to="/">
              <img src={ICONS.logo} alt="Logo" className="logo__img" />
            </Link>
          </div>

          <div className="footer-nav">
            <nav className="nav">
              <ul className="nav__list">
                <li className="nav__item">
                  <NavLink
                    to="https://github.com/YuraMisura/react_phone-catalog"
                    className={getLinkClass}
                  >
                    GITHUB
                  </NavLink>
                </li>

                <li className="nav__item">
                  <NavLink
                    to="/contacts"
                    className={getLinkClass}
                  >
                    CONTACTS
                  </NavLink>
                </li>

                <li className="nav__item">
                  <NavLink
                    to="/rights"
                    className={getLinkClass}
                  >
                    RIGHTS
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="footer__button">
            <p className="footer__button-text">Back to top</p>

            <button
              type="button"
              className="button button--direction button--hover"
              onClick={handleScrollToTop}
            >
              <img
                src={ICONS.arrow}
                alt="Back to top"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
