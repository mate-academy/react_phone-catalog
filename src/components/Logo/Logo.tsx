import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <>
      <Link to="Home" className="header__logo">
        <img src="../img/icons/Logo.svg" alt="logo" />
      </Link>
    </>
  );
};

export default Logo;
