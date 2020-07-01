import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavMobile.scss';
import HamburgerMenu from 'react-hamburger-menu';

type NavLinks = {
  path: string;
  text: string;
};

const NAV_LINKS = [
  { path: '/', text: 'HOME' },
  { path: '/phones', text: 'PHONES' },
  { path: '/tablets', text: 'TABLETS' },
  { path: '/accessories', text: 'ACCESSORIES' },
];

export const NavMobile = () => {
  const [open, setOpen] = useState(false);
  const [whidth, setWhidth] = useState<number>(-1000);

  const handleClick = () => {
    if (!open) {
      setOpen(true);
      setWhidth(0);
    } else {
      setOpen(false);
      setWhidth(-1000);
    }
  };

  const handeleLinkClick = () => {
    setOpen(false);
    setWhidth(-1000);
  };

  const navStyle = {
    transform: `translateX(${whidth}px)`,
    transition: 'transform 0.5s',
  };

  return (
    <>
      <HamburgerMenu
        isOpen={open}
        menuClicked={() => handleClick()}
        width={40}
        height={20}
        strokeWidth={2}
        rotate={0}
        color="black"
        borderRadius={0}
        animationDuration={0.5}
        className="Hamburger__menu cursor"
      />
      <ul className="nav__mobile_list" style={navStyle}>
        <div className="nav__menu-stick">
          <span className="nav__menu-underline--1"></span>
          <span className="nav__menu-underline--2"></span>
        </div>
        {NAV_LINKS.map((link: NavLinks) => (
          <li
            key={link.path}
            onClick={() => handeleLinkClick()}
            className="nav__item-menu"
          >
            <NavLink
              to={link.path}
              exact
              activeClassName="nav__link-menu--active"
              className="nav__link-menu"
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};
