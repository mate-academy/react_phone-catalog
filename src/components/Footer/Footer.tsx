import React from 'react';
import './footer.scss';
import { NavLink } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article className="footer">
      <div className="footer__logo">
        <NavLink className="navigation-logo" to="./home"></NavLink>
      </div>

      <div className="footer-items">
        <NavLink
          className="footer-items__link"
          to="https://github.com/StanislavKapytsia"
        >
          Github
        </NavLink>
        <NavLink
          className="footer-items__link"
          to="https://www.facebook.com/staskapica"
        >
          Contacts
        </NavLink>
        <NavLink className="footer-items__link" to="https://mate.academy/">
          Rights
        </NavLink>
      </div>

      <div className="footer-button" onClick={scrollToTop}>
        <span className="footer-button__text">Back to top</span>
        <button className="footer-button__button"></button>
      </div>
    </article>
  );
};
