import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import './Logo.scss';

import logo from '../../images/icons/Logo_icon.svg';

export const Logo: React.FC = memo(() => {
  return (
    <Link className="Logo" to="/">
      <img src={logo} alt="Logo" />
    </Link>
  );
});
