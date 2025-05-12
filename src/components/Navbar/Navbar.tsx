import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Navbar.scss';
import React from 'react';
import { LuHeart } from 'react-icons/lu';
import { LuShoppingBag } from 'react-icons/lu';
import { LuMenu } from "react-icons/lu";
import Menu from '../Menu/Menu';


export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { ' has-underline': isActive });

  return (
    <>
      <nav className="navbar">
        <div className="navbar__text">
          <div className="logo">
            <NavLink to="/">
              <img src="/img/logo.png" alt="company_logo" />
            </NavLink>
          </div>

          <div className="navbar__link__container">
            {/* <div className="navbar-brand"> */}
            <NavLink to="/" className={getLinkClass}>
              HOME
            </NavLink>

            <NavLink to="/phones" className={getLinkClass}>
              PHONES
            </NavLink>

            <NavLink to="/tablets" className={getLinkClass}>
              TABLETS
            </NavLink>

            <NavLink to="/accessories" className={getLinkClass}>
              ACCESSORIES
            </NavLink>
          </div>
        </div>
        <div className="navbar__buttons">
          
          <NavLink to="/favorites" className="navbar__icon__heart">
            <LuHeart />
          </NavLink>
          
          
          <NavLink to="/cart" className="navbar__icon__basket">
            <LuShoppingBag />
          </NavLink>
          
        </div>
        <div className="burger-menu">
          <a href="menu">
            <LuMenu />
          </a>
        </div>
      </nav>
      <Menu />
    </>
  );
};
