import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import './Header.scss';

import { Logo } from '../Logo/Logo';

export const Header = () => {
  return (
    <header className="header">
      <Logo />
      <Navbar />
    </header>
  );
};
