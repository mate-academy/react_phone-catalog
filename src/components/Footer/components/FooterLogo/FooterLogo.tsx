import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../../images/Header/Logo.svg';

const FooterLogo: React.FC = () => {
  return (
    <Link to="/" className="footer__logo">
      <img src={logo} alt="Logo" className="footer__logo-img" />
    </Link>
  );
};

export default FooterLogo;
