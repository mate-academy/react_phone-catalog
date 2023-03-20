import React from 'react';
import { Link } from 'react-router-dom';

export const FooterNav: React.FC = () => (
  <nav className="footer-nav">
    <Link
      to="https://github.com/"
      className="footer-nav__link"
    >
      <p className="uppercase_text">github</p>
    </Link>
    <Link
      to="https://github.com/"
      className="footer-nav__link"
    >
      <p className="uppercase_text">contacts</p>
    </Link>
    <Link
      to="https://github.com/"
      className="footer-nav__link"
    >
      <p className="uppercase_text">rights</p>
    </Link>
  </nav>
);
