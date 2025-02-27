import React from 'react';
import { Link } from 'react-router-dom';

import './Logo.scss';

type Props = {
  logoClass: string;
};

export const Logo: React.FC<Props> = ({ logoClass }) => (
  <Link to="/" className={`logo ${logoClass}__logo`}>
    <img src="./img/logo.png" alt="logo" className="logo__img" />
  </Link>
);
