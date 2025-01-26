import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => (
  <div className="footer">
    <Link to="/" className="header__logo-link">
      <img
        src="/img/icons/Logo.png"
        alt="photo-logo"
        className="header__logo"
      />
    </Link>
    <nav className="footer__nav">
      <ul className="footer__nav__list">
        <li className="list__item">
          <Link to="#" className="nav__link">
            Github
          </Link>
        </li>
        <li className="list__item">
          <Link to="#" className="nav__link">
            Contacts
          </Link>
        </li>
        <li className="list__item">
          <Link to="#" className="nav__link">
            rights
          </Link>
        </li>
      </ul>
    </nav>
    <div className="footer__back-top">
      <p className="small-text">Back to top</p>
      <a href="#" className="icon icon__footer icon--back-top"></a>
    </div>
  </div>
);
