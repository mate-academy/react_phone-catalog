import React from 'react';
import { Nav } from '../Nav';
import { FOOTER_NAVIGATION } from '../../helpers/variables';
import './Footer.scss';

export const Footer = () => (
  <footer className="Footer">
    <img
      src="/img/icons/logo.svg"
      alt="header-logo"
      className="Footer-Logo"
    />
    <Nav navLinks={FOOTER_NAVIGATION} navType="footer" />
    <div className="Footer-Anchor">
      <span
        className="Footer-AnchorText"
      >
        Back to top
      </span>
      <button
        type="button"
        className="Footer-UpIcon"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <img src="img/icons/arrow-up.svg" alt="move-up" />
      </button>
    </div>
  </footer>
);
