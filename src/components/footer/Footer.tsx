import React, { useCallback } from 'react';
import './Footer.scss';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const footerList = ['GITHUB', 'CONTACTS', 'RIGHTS'];

  const backToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <footer className="footer">
      <NavLink
        to="/"
        exact
        className="Logo footer__logo"
      />
      <nav className="footer__wrapper">
        <ul className="footer__list">
          {footerList.map((listItem) => (
            <li>
              <NavLink
                to={`${listItem}`}
                exact
                className="Nav__item link"
                activeClassName="Nav__item--active"
                key={listItem}
              >
                {listItem}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="footer__top-button-container">
        <p className="footer__paragraph">Back to top</p>
        <button
          type="button"
          aria-label="BackToTop"
          className="footer__top-button"
          onClick={backToTop}
        />
      </div>
    </footer>
  );
};

export default Footer;
