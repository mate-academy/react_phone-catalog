/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import * as Scroll from 'react-scroll';
import './Footer.scss';
import { NavLink } from 'react-router-dom';

export const Footer: React.FC = () => {
  const gitHubLink = 'https://github.com/anastasiiaafanasieva';
  const scroll = Scroll.animateScroll;

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <nav
      className="navbar has-shadow nav-footer"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand has-text-weight-bold">
        <NavLink
          to=""
          className={navData => `logo navbar-item ${navData.isActive ? 'active' : ''}`}
        >
          Logo
        </NavLink>
      </div>

      <div className="navbar-item navbar-center">
        <a
          href={gitHubLink}
          target="_blank"
          rel="noreferrer"
          className="footer-link"
        >
          Github
        </a>
      </div>

      <div className="navbar-end">
        <div
          className="navbar-item back-to-top footer-link"
          onClick={scrollToTop}
        >
          Back to top
          <i className="fa-solid fa-arrow-up ml-2" />
        </div>
      </div>
    </nav>
  );
};
