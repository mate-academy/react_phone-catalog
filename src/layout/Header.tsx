// import classNames from "classnames";
// import { NavLink } from "react-router-dom";
// // import { logo, favouritesIcon, shoppingBagIcon } from '../assets/icons';
// import logo from '../../public/img/logo/Logo.svg';
// import favouritesIcon from '../../public/img/icons/Favourites.svg';
// import shoppingBagIcon from '../../public/img/icons/ShoppingBag.svg';

// export  const Navbar = () => {
//   const selectedPage = ({ isActive }: { isActive: boolean }) =>
//     classNames('header__nav-link', { 'header__nav-link--active': isActive});
//   return (
//     <header id="top" className="header">
//         <div className='header__logo'>
//           <a href="/" className='header__logo-link'>
//             <img src={logo} alt="Logo" className='header__logo-logo' />
//           </a>
//           <nav>
//             <ul className='header__nav-list'>

//                 <NavLink to="/" className={selectedPage}>HOME</NavLink>

//                 <NavLink to="/phones" className={selectedPage}>PHONES</NavLink>

//                 <NavLink to="/tablets" className={selectedPage}>TABLETS</NavLink>

//                 <NavLink to="/accessories" className={selectedPage}>ACCESSORIES</NavLink>

//             </ul>
//           </nav>
//         </div>

//         <div className='header__icons'>
//           <a href="/favourites" className="header__icon header__icon--favourites">
//             <img src={favouritesIcon} alt="Favourites" />
//           </a>
//           <a href="/shopping-bag" className="header__icon header__icon--bag">
//             <img src={shoppingBagIcon} alt="Shopping Bag" />
//           </a>
//         </div>
//       </header>

//   )
// }

// src/components/Header.tsx


import React, { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { logo, favouritesIcon, shoppingBagIcon } from '../assets/icons';
import '../App.scss';
import classNames from 'classnames';

interface HeaderProps {

}
export const Header = forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
  const selectedPage = (isActive: boolean) =>
    classNames('header__nav-link', { active: isActive });

  return (
    <header ref={ref} className="header">
      <div className="header__logo">
        <NavLink to="/" className="header__logo-link">
          <img src={logo} alt="Logo" className="header__logo-logo" />
        </NavLink>

        <nav>
          <ul className="header__nav-list">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => selectedPage(isActive)}
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/phones"
                className={({ isActive }) => selectedPage(isActive)}
              >
                PHONES
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tablets"
                className={({ isActive }) => selectedPage(isActive)}
              >
                TABLETS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accessories"
                className={({ isActive }) => selectedPage(isActive)}
              >
                ACCESSORIES
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="header__icons">
        <NavLink
          to="/favourites"
          className="header__icon header__icon--favourites"
        >
          <img src={favouritesIcon} alt="Favourites" />
        </NavLink>
        <NavLink to="/shopping-bag" className="header__icon header__icon--bag">
          <img src={shoppingBagIcon} alt="Shopping Bag" />
        </NavLink>
      </div>
    </header>
  );
});
