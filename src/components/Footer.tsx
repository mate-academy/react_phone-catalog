import React, { FC } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <Link to="/">
          <img src="img/Apple.svg" alt="Apple" />
          <img src="img/Drocher.svg" alt="Drocher" />
        </Link>
      </div>
      <nav className="footer__nav">
        <ul className="footer__nav-list">
          <li>
            <a
              href="https://github.com/"
              className="footer__nav-item"
              target="blanc"
            >
              Github
            </a>
          </li>
          <li>
            <NavLink to="/contacts" className="footer__nav-item">
              Contacts
            </NavLink>
          </li>
          <li>
            <NavLink to="/rights" className="footer__nav-item">
              Rights
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="footer__up-conteiner">
        <HashLink
          to={`${useLocation().pathname}#header`}
          className="footer__up"
        >
          <p>Back to top</p>
          <span className="footer__up-button" />
        </HashLink>
      </div>
    </footer>
  );
};
