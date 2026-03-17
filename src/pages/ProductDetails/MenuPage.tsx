import React from 'react';
import { NavItem } from '../../components/Navbar/Navbar';
import '../../styles/style.scss';

export const MenuPage = () => {
  return (
    <div className="navbar__menu">
      <NavItem to="/">Home</NavItem>
      <NavItem to="/phones">Phones</NavItem>
      <NavItem to="/tablets">Tablets</NavItem>
      <NavItem to="/accessories">Accessories</NavItem>
    </div>
  );
};
