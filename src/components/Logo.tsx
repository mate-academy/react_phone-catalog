import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <div className="logo">
      <Link to="/" className="logo__link">
        <img
          src="./img/logo.svg"
          alt="logo"
          className="logo__img"
        />
      </Link>
    </div>
  );
};
