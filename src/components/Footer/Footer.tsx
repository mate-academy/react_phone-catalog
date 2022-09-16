import React from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { Logo } from '../Logo';

import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <div className="Footer">
      <div className="Footer__container">
        <Logo />
        <div className="Footer__nav">
          <a
            className="Footer__link"
            href="https://github.com/PermiakovDima"
          >
            Github
          </a>
        </div>
        <button
          type="button"
          className="Footer__button-top"
          onClick={() => scroll.scrollToTop()}
        >
          Back to top
          <span className="icon-Chevron-Arrow-Up Footer__icon" />
        </button>
      </div>
    </div>
  );
};
