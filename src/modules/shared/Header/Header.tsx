import React from 'react';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <div className="header">
      <a href="#">
        <img src="logo.svg" alt="Nice Gadgets" className="header__logo" />
      </a>

      <div className="header__menu">
        <ul className="header__list">
          <li className="header__nav-item">
            <a className="header__nav-link" href="#">
              home
            </a>
          </li>
          <li className="header__nav-item">
            <a className="header__nav-link" href="#">
              Phones
            </a>
          </li>
          <li className="header__nav-item">
            <a className="header__nav-link" href="#">
              tablets
            </a>
          </li>
          <li className="header__nav-item">
            <a className="header__nav-link" href="#">
              accessories
            </a>
          </li>
        </ul>
      </div>

      <div className="header__buttons-right">
        <a href="#" className="header__icon header__icon--menu"></a>
        <a href="#" className="header__icon header__icon--shoping_bag"></a>
        <a href="#" className="header__icon header__icon--favourite"></a>
      </div>
    </div>
  );
};
