// import './Footer.module.scss';
import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <Link to="/" className="footer__logo-link">
          <img src="./img/logo/logo-nice-gadgets.svg" alt="logo" />
        </Link>

        <div className="contacts">
          <ul className="contacts__items">
            <li className="contacts__item">
              <Link className="contacts__link" to="/github">
                GitHub
              </Link>
            </li>

            <li className="contacts__item">
              <Link className="contacts__link" to="/contacts">
                Contacts
              </Link>
            </li>

            <li className="contacts__item">
              <Link className="contacts__link" to="/rights">
                Rights
              </Link>
            </li>
          </ul>
        </div>

        <div className="on-top">
          <a
            className="on-top__link"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="on-top__text">Back to top</div>
            <span className="on-top__image"></span>
          </a>
        </div>
      </div>
    </footer>
  );
};
