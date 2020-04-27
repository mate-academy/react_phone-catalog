import React, { FC } from 'react';
import './_LogoLink.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export const LogoLink: FC = () => {
  return (
    <Link to="/" className="logo-link">
      <img
        src={logo}
        alt="logo"
        className="logo__img"
      />
    </Link>
  );
};
