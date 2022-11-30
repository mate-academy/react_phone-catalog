import { Link } from 'react-router-dom';
import '../App.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <Link to="/" className="header__logo logo" />
          <nav className="footer__nav">
            <ul className="footer__list">
              <li className="footer__item">
                <a href="/github" className="footer__link">Github</a>
              </li>
              <li className="footer__item">
                <Link
                  to="/contacts"
                  className="footer__link"
                >
                  Contacts
                </Link>
              </li>
              <li className="footer__item">
                <Link
                  to="/rights"
                  className="footer__link"
                >
                  Rights
                </Link>
              </li>
            </ul>
          </nav>
          <div className="top">
            <span className="top__title">Back to top</span>
            <button
              type="button"
              className="top__button"
              aria-label="top-button"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
