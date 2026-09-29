import { Link } from 'react-router-dom';

import './NavFooter.scss';

export const NavFooter = () => {
  return (
    <nav className="nav-footer">
      <ul className="nav-footer__list">
        <li className="nav-footer__item">
          <a
            href="https://github.com/Grigoriy01/react_phone-catalog"
            className="nav-footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </li>
        <li className="nav-footer__item">
          <Link to="/contacts" className="nav-footer__link">
            Contacts
          </Link>
        </li>
        <li className="nav-footer__item">
          <Link to="/rights" className="nav-footer__link">
            Rights
          </Link>
        </li>
      </ul>
    </nav>
  );
};
