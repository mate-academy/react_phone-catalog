import React from 'react';
import { NavLink } from 'react-router-dom';


export const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/phones" exact>
            PHONES
          </NavLink>
        </li>
        <li>
          <NavLink to="/tablets" exact>
            TABLETS
          </NavLink>
        </li>
        <li>
          <NavLink to="/accessories" exact>
            ACCESSORIES
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
