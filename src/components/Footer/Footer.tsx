import './Footer.scss';
import '../../styles/Nav.scss';
import { NavLink } from 'react-router-dom';

export const Footer:React.FC = () => {
  const toTopHandle = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer__content">
        <div className="footer__logo">
          <a href="/" className="footer__link">
            <img
              src="./img/header/logo.svg"
              alt="logo"
            />
          </a>
        </div>
        <div className="footer__contacts">
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink to="/" className="nav__link">
                  Github
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/" className="nav__link">
                  Contacts
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/" className="nav__link">
                  Rights
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <button
          type="button"
          className="footer__to-top"
          onClick={() => toTopHandle()}
        >
          <h3 className="footer__to-top-text">
            Back to top
          </h3>
          <div
            className="footer__to-top-button"
          />
        </button>
      </div>
    </footer>
  );
};
