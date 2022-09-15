import React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.scss';

export const Nav:React.FC = () => {
  const setActive = ({ isActive }: { isActive:boolean }) => (isActive ? 'Nav__link Nav__link--active' : 'Nav__link');

  return (
    <div className="Nav">
      <NavLink to="/" className={setActive}>Home</NavLink>
      <NavLink to="/phones" className={setActive}>Phones</NavLink>
      <NavLink to="/tablets" className={setActive}>Tablets</NavLink>
      <NavLink to="/accessories" className={setActive}>Accessories</NavLink>
    </div>
  );
};
