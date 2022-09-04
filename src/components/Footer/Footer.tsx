import './Footer.scss';
import '../../styles/Nav.scss';

export const Footer:React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer__content">
        <div className="footer__logo">
          <a href="/" className="footer__link">
            <img
              src="/img/header/logo.svg"
              alt="logo"
            />
          </a>
        </div>
        <div className="footer__contacts">
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <a href="/" className="nav__link">
                  Github
                </a>
              </li>
              <li className="nav__item">
                <a href="/" className="nav__link">
                  Contacts
                </a>
              </li>
              <li className="nav__item">
                <a href="/" className="nav__link">
                  Rights
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <a
          href="/"
          className="footer__to-top"
        >
          <h3 className="footer__to-top-text">
            Back to top
          </h3>
          <div
            className="footer__to-top-button"
          >
            <img
              src="/img/Vector (Stroke).svg"
              alt="to top"
              className="footer__arrow"
            />
          </div>
        </a>
      </div>
    </footer>
  );
};
