import React from 'react';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <Link to="/">
      <img
        src="img/UI_KIT.svg"
        alt="logo"
        className="logo"
      />
    </Link>
  );
};
