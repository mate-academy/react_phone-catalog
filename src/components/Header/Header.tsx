import React, { FC } from 'react';
import './_Header.scss';
import { Navigation } from '../Navigation';

export const Header: FC = () => (

  <header className="header">
    <div className="header__container">
      <div className="header__logo" id="home" />

      <Navigation />

    </div>
  </header>
);
