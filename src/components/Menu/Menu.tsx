import './Menu.scss';
import React, { useState } from 'react';
import { LuHeart } from 'react-icons/lu';
import { LuShoppingBag } from 'react-icons/lu';
import { NavLink } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';
import classNames from 'classnames';

type MenuProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
};
export const Menu = ({ isMenuOpen, setIsMenuOpen }: MenuProps) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-underline': isActive });

  return (
    <aside className={classNames('menu', { 'is-open': isMenuOpen })} id="menu">
      <div className="menu__top">
        <div className="menu__logo">
          <NavLink
            to="/"
            onClick={e => {
              setIsMenuOpen(false);
            }}
          >
            <img src="./img/logo.png" alt="company_logo" />
          </NavLink>
        </div>
        <div className="close">
          <NavLink
            to="/"
            onClick={e => {
              setIsMenuOpen(false);
            }}
          >
            <GrClose />
          </NavLink>
        </div>
      </div>

      <div className="menu__link__container">
        <NavLink
          to="/"
          className={getLinkClass}
          onClick={e => {
            setIsMenuOpen(false);
          }}
        >
          HOME
        </NavLink>

        <NavLink
          to="/phones"
          className={getLinkClass}
          onClick={e => {
            setIsMenuOpen(false);
          }}
        >
          PHONES
        </NavLink>

        <NavLink
          to="/tablets"
          className={getLinkClass}
          onClick={e => {
            setIsMenuOpen(false);
          }}
        >
          TABLETS
        </NavLink>

        <NavLink
          to="/accessories"
          className={getLinkClass}
          onClick={e => {
            setIsMenuOpen(false);
          }}
        >
          ACCESSORIES
        </NavLink>
      </div>

      <div className="menu__bottom">
        <div className="menu__heart">
          <NavLink
            to="/favorites"
            className={getLinkClass}
            onClick={e => {
              setIsMenuOpen(false);
            }}
          >
            <span className="menu__bottom__icons">
              <LuHeart />
            </span>
          </NavLink>
        </div>
        <div className="menu__basket">
          <NavLink
            to="/cart"
            className={getLinkClass}
            onClick={e => {
              setIsMenuOpen(false);
            }}
          >
            <span className="menu__bottom__icons">
              <LuShoppingBag />
            </span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Menu;
