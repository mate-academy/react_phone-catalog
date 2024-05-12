import React from 'react';
import { Link } from 'react-router-dom';

const NavFooter: React.FC = () => {
  return (
    <nav className="menu footer__menu">
      <ul className="menu__list footer__list">
        <li className="menu__item footer__item">
          <Link
            to="https://github.com/VadimDrobyazko"
            className="menu__link footer__link"
            target="_blank"
          >
            github
          </Link>
        </li>

        <li className="menu__item footer__item">
          <Link to="/contacts" className="menu__link footer__link">
            contacts
          </Link>
        </li>

        <li className="menu__item footer__item">
          <Link
            to="https://imgur.com/a/RKC7J9x"
            className="menu__link footer__link"
            target="_blank"
          >
            rights
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavFooter;
