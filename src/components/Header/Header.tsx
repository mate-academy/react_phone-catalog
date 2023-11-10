import './Header.scss';
import React from 'react';
import { Nav } from '../Nav';

export const Header: React.FC = () => {
  return (
    <header
      className="header"
    >
      <Nav />
    </header>
  );
};
