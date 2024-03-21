import React from 'react';

import '../styles/Menu.scss';
import { FavCart } from './FavCart';
import { Navigation } from './Navigation';

export const Menu: React.FC = () => {
  return (
    <nav className="menu">
      <Navigation />

      <FavCart />
    </nav>
  );
};
