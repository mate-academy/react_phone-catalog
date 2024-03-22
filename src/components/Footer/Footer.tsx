import React from 'react';
import { Link } from 'react-router-dom';

import { Logo } from '../Logo';

import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer className="Footer App__footer">
      <div className="Footer__container">
        <Logo />

        <section className="Footer__links">
          <Link
            to="https://github.com/PodvAx/react_phone-catalog/tree/master"
            className="Footer__link"
            target="_blank"
          >
            Github
          </Link>
          <Link to="/contacts" className="Footer__link">
            Contacts
          </Link>
          <Link to="/rights" className="Footer__link">
            Rigths
          </Link>
        </section>

        <a
          href="#top"
          onClick={e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="Footer__backToTop"
        >
          <span className="Footer__backToTopName">Back to top</span>
          <span className="Footer__backToTopBtn">
            <i className="fas fa-chevron-up" />
          </span>
        </a>
      </div>
    </footer>
  );
};
