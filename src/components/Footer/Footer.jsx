import React from 'react';
import './Footer.scss';
import { animateScroll as scroll } from 'react-scroll';
import topArrow from '../../assets/images/icons/top-arrow.svg';

export const Footer = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (

    <footer className="footer">
      <div className="footer-wrapper">
        <div className="footer-wrapper__logo">
          <a
            className="footer-wrapper__logo-link"
            href="https://www.youtube.com/watch?v=fHiGbolFFGw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="footer-wrapper__logo-heading">Android</p>
            <p className="footer-wrapper__logo-underheading">paranoid</p>
          </a>
        </div>
        <div className="footer-wrapper__contacts contacts">
          <a
            href="https://github.com/YMagrelo/react_phone-catalog"
            className="contacts__github"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/yaroslav-magrelo-924008198/"
            className="contacts__linkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contacts
          </a>
        </div>
        <div className="footer-wrapper__home">
          <span>Back to top</span>
          <button
            onClick={scrollToTop}
            type="button"
            className="footer-wrapper__home-btn"
          >
            <img src={topArrow} alt="to top" />
          </button>
        </div>
      </div>
    </footer>
  );
};
