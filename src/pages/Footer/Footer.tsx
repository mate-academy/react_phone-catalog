import React from "react";
import { NavLink } from "react-router-dom";
import Logo from '../../images/homePage/Logo.svg';
import Vector_Up from '../../images/homePage/Vector_Up.svg';
import './Footer.scss';

export const Footer = () => {
  return (
      <footer className="footer">
        <div className="footer__top-head">
          <NavLink to="/">
            <img
              className="footer__logo"
              src={Logo}
              alt='logo'
            />
          </NavLink>
        </div>
          <div className="footer__links">
            <NavLink
              to="/"
              className="footer__github">
                GITHUB
            </NavLink>
            <NavLink
              to="/"
              className="footer__contacts">
                CONTACTS
            </NavLink>
            <NavLink
              to="/"
              className="footer__rights">
                RIGHTS
            </NavLink>
          </div>
        <div className='footer__back'>
          <a
            href="#"
            title='up'
            className="footer__back__link">
              Back to top
              <img 
                src={Vector_Up}
                className='footer__back__img'
              />
          </a>
        </div>
      </footer>
  )
}