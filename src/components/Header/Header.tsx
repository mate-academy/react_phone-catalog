import React, { FC } from 'react';
import './_Header.scss';
import Navigation from '../Navigation/Navigation';
import { LogoLink } from '../LogoLink';

export const Header: FC = () => (

  <header className="header" id="home">
    <div className="header__container">
      <LogoLink />
      <Navigation />
    </div>
  </header>
);
