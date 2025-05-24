import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Footer.scss';
import React from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { Link as ScrollLink } from 'react-scroll';

export const Footer = () => {
  // const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  //   classNames('navbar-item', { ' has-underline': isActive });

  return (
    <nav className="navbar__footer">
      <div className="footer__logo">
        <NavLink to="/">
          <img src="./img/logo.png" alt="company_logo" />
        </NavLink>
      </div>
      {/* <div className="container"> */}
      <div className=" footer__links">
        <a
          href="https://github.com/hardaira/react_phone-catalog"
          className="externalLink footer__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          GITHUB
        </a>

        <a href="#contacts" className="footer__link">
          CONTACTS
        </a>

        <a href="#rights" className="footer__link">
          RIGHTS
        </a>
      </div>
      <div className="footer__icon">
        <p className="arrow__up__text"> Back to top </p>
        <ScrollLink
          to="heading1"
          smooth={true}
          duration={200}
          offset={-80}
          className="icon__arrow__up"
        >
          <IoIosArrowUp color="#313237" />
        </ScrollLink>
      </div>
    </nav>
  );
};
