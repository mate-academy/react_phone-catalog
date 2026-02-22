import React from 'react';
import Logo from '../ui/Logo';
import { Link, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header
      className="m-0 h-16 w-full flex justify-between
    sticky top-0 z-50 backdrop-blur-md
    flex-row font-mont font-semibold border border-gray-400 items-center"
    >
      <Link to="/">
        <Logo />
      </Link>

      <nav className="flex sm:w-full justify-between">
        <ul className=" hidden sm:flex uppercase text-gray-500 text-sm mx-6 flex-row items-center gap-8 sm:gap-16">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'header__is-active' : ''
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                isActive ? 'header__is-active' : ''
              }
            >
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                isActive ? 'header__is-active' : ''
              }
            >
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                isActive ? 'header__is-active' : ''
              }
            >
              Accessories
            </NavLink>
          </li>
        </ul>

        <div className="hidden sm:flex">
          <NavLink
            to="/favourites"
            className={({ isActive }) => (isActive ? 'options__is-active' : '')}
          >
            <div className="w-16 h-16 flex items-center justify-center border-l border-r border-gray-200">
              <img
                src="../../../public/img/icons/Favourites (Heart Like).svg"
                alt="favourites"
              />
            </div>
          </NavLink>
          <NavLink
            to="cart"
            className={({ isActive }) => (isActive ? 'options__is-active' : '')}
          >
            <div className="w-16 h-16 flex items-center justify-center border-l border-r border-gray-200">
              <img
                src="../../../public/img/icons/Shopping bag (Cart).svg"
                alt="cart"
              />
            </div>
          </NavLink>
        </div>
        <div className="flex m-0 p-0 items-center justify-center w-16 h-16 border-l border-r border-gray-200 sm:hidden">
          <button>
            <img
              className="w-4 h-4"
              src="../../../public/img/icons/burger.svg"
              alt="menu"
            />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
