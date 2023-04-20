import React from 'react';
import { Link } from 'react-router-dom';

export const FooterNav: React.FC = () => (
  <nav className="footer-nav">
    <Link
      to="https://github.com/serhii-yunnikov/react_phone-catalog/tree/develop"
      className="footer-nav__link"
    >
      <p className="uppercase_text">github</p>
    </Link>
    <Link
      to="/Contacts"
      className="footer-nav__link"
    >
      <p className="uppercase_text">contacts</p>
    </Link>
    <Link
      to="/Rights"
      className="footer-nav__link"
    >
      <p className="uppercase_text">rights</p>
    </Link>
  </nav>
);
