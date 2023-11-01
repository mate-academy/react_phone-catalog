import './Header.scss';
import React from 'react';
import { Nav } from '../Nav';

export const Header: React.FC = () => {
  return (
    <header
      className="page_header header"
    >
      <Nav />
    </header>
  );
};
