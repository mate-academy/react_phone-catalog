import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.scss';

type Props = {};

export const Logo: React.FC<Props> = () => {
  return (
    <Link to="/" className="logo-link">
      <img src="./img/ico/logo.svg" alt="logo" className="logo" />
    </Link>
  );
};
