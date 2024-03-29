import React from 'react';
import logoImg from '../images/logo.svg';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <Link
      to="/"
      className="flex h-5.5 w-16 transition
      hover:scale-110 lg:h-7 lg:w-20"
    >
      <img src={logoImg} alt="Logo" />
    </Link>
  );
};
