import React from 'react';
import './Logo.scss';

export const Logo = () => {
  return (
    <div className="logo">
      <a href="#home" className="logo__link">
        <img
          src="../../../img/logo-nice-gadgets.svg"
          alt="Nice Gadgets Logo"
          className="logo__image"
        />
      </a>
    </div>
  );
};
