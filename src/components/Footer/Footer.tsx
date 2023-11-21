/* eslint-disable jsx-a11y/control-has-associated-label */
import { NavLink } from 'react-router-dom';
import { scrollToTop } from '../../services/scrollToTop';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__nav">
          <nav className="footer__nav-bar">
            <NavLink to="/" className="logo icon" />
            <ul className="menu__list">
              <li className="menu__item">
                <NavLink
                  to="#/"
                  className="menu__link"
                  target="_blank"
                >
                  Github
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  to="#/"
                  className="menu__link"
                  target="_blank"
                >
                  Contacts
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  to="#/"
                  className="menu__link"
                  target="_blank"
                >
                  rights
                </NavLink>
              </li>
            </ul>
            <div className="to-top__block">
              Back to top
              <button
                type="button"
                className="to-top__button icon"
                onClick={scrollToTop}
              />
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
};
