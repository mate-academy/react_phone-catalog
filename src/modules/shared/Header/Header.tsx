import classNames from 'classnames';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.module.scss'

// type Props = {

// }


export const Header = () => {
  const getLinkActive = ({ isActive }: { isActive: boolean }) => {
    console.log(isActive)
    return classNames('nav-link', {
      'nav-link-active': isActive,
    });
  }
  

  return (
    <nav>
      <div className="nav-bar">
        <Link to='/'>
          <img className='nav-logo' src="../../../img/Logo.png" alt="Logo" />
        </Link>
        <NavLink to="/home" className={getLinkActive}>
          home
        </NavLink>
        <NavLink to="/phones" className={getLinkActive}>
          phones
        </NavLink>
        <NavLink to="/tablets" className={getLinkActive}>
          tablets
        </NavLink>
        <NavLink to="/accessories" className={getLinkActive}>
          accessories
        </NavLink>
      </div>
    </nav>
  );
};
