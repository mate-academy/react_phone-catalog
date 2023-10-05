import { FC } from 'react';
import { NavBar } from '../NavBar/NavBar';
import { NavIcons } from '../NavIcons/NavIcons';

import './Header.scss';

export const Header: FC = () => {
  return (
    <div className="header">
      <div className="nav-container">
        <NavBar />
      </div>

      <div className="icons-container">
        <NavIcons />
      </div>
    </div>
  );
};
