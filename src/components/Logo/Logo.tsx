import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Header/Logo.svg';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="logo footer__logo">
      <img src={logo} alt="Logo" className="logo__img" />
    </Link>
  );
};

export default Logo;
