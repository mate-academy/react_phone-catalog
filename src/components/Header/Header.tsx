import './Header.scss';
import React, { memo } from 'react';
import { Nav } from '../Nav';

export const Header: React.FC = memo(() => {
  return (
    <header
      className="header"
    >
      <Nav />
    </header>
  );
});
